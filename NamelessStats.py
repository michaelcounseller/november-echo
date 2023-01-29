#!/bin/python3

import mysql.connector
import requests
import sys
import json
import argparse
import time

#Database Vars
playersdb = mysql.connector.connect(
  host="localhost",
  user="",
  password="",
  database="namelessplayers"
)
teamsdb = mysql.connector.connect(
  host="localhost",
  user="",
  password="",
  database="namelessteams"
)
playerscursor = playersdb.cursor()
teamscursor = teamsdb.cursor()

# Options
parser = argparse.ArgumentParser(description="Required: -g -r -b -k -s")
parser.add_argument('-r', '--redteam', type=str, help='The team name on red side no spaces')
parser.add_argument('-b', '--blueteam', type=str, help='The team on blue side no spaces')
parser.add_argument('-g', '--game', type=str, help='Game id')
options = parser.parse_args(sys.argv[1:])

#Riot API Vars
region = 'NA1'
apikey = ''
gameID = options.game
redID = 200
blueID = 100

# ID Jsons
with open('championIdKey.json') as f:
    champ_ids = json.load(f)

# Functions #
def createPlayerTable(player): #Creates a new table for a new player
    playerscursor.execute(f"CREATE TABLE IF NOT EXISTS {player} LIKE playermaster")

def updateTable(table, values):
    values_string = str(tuple(values))
    playerscursor.execute(f"INSERT INTO {table} VALUES {values_string}")

def convertTime(duration): #convert game times
    return time.strftime('%M:%S', time.gmtime(duration))

def getChamp(champID: int): #replace champ ids with names
    return champ_ids[str(champID)]

def extractMatchData(Gamejs):
    basic_info = {}
    basic_info['Game Duration'] = convertTime(Gamejs['info']['gameDuration'])
    basic_info['Match ID'] = Gamejs['info']['gameId']
    basic_info['Version'] = Gamejs['info']['gameVersion'][0:5]
    return basic_info

def updateMatchHistory(values):
    convertedvalues = str(tuple(values))
    teamscursor.execute(f"INSERT INTO matchhistory VALUES {convertedvalues}")

def createTeamTable(team):
    teamscursor.execute(f"CREATE TABLE IF NOT EXISTS {team} LIKE teammaster")

def updateTeam(team, player):
    teamscursor.execute(f"INSERT IGNORE INTO {team} VALUES('{player}')")


def getData(gameregion, gameid, apikey): # initial api pull
    GameRequest = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/{gameregion}_{gameid}?api_key={apikey}')
    GameData = GameRequest.json()
    print(str(GameRequest.status_code))
    if GameRequest.status_code == 404:
        print("Match ID not found")
    if GameRequest.status_code == 403:
        print("Bad API key")
    if GameRequest.status_code == 400:
        print('Incorrect Format')
    if GameRequest.status_code == 429:
        print('Too many requests, try again later')
    return GameData


def main():
    red_team_name = options.redteam
    blue_team_name = options.blueteam

    GameStatsjs = getData(region, gameID, apikey)
    updateMatchHistory(extractMatchData(GameStatsjs).values())

    for participant in GameStatsjs['info']['participants']:

        player_name = participant['summonerName']
        player_table_name = player_name.replace(" ", "_") #tables no likey spaces
        createPlayerTable(player_table_name)#Creates table if not already exists
        createTeamTable(red_team_name)
        createTeamTable(blue_team_name)

        player_data = {}
        player_data['Player'] = participant['summonerName']
        player_data['Role'] = participant['teamPosition']
        if participant['teamPosition'] == "UTILITY": # renaming utility to support
            player_data['Role'] = 'SUPPORT'
        player_data['Champion'] = participant['championName']
        # assigning team for player
        if participant['teamId'] == blueID:
            player_data['Team'] = 'Blue'
        elif participant['teamId'] == redID:
            player_data['Team'] = 'Red'
        else:
            player_data['Team'] = 'N/A'
        player_data['Playtime'] = convertTime(participant['timePlayed'])

        ### Player Stats ###
        ## Basic Stats ##
        player_data['Kills'] = participant['kills']
        player_data['Deaths'] = participant['deaths']
        player_data['Assists'] = participant['assists']
        ## Specific Stats ##
        # Damage #
        player_data['Champion Damage'] = participant['totalDamageDealtToChampions']
        player_data['Structure Damage'] = participant['damageDealtToBuildings']
        # Taken and Healed #
        player_data['Damage Healed'] = participant['totalHeal']
        player_data['Damage Shielded'] = participant['totalDamageShieldedOnTeammates']
        player_data['Damage Taken'] = participant['totalDamageTaken']
        player_data['Damage Mitigated'] = participant['damageSelfMitigated']
        # Vision #
        player_data['Vision Score'] = participant['visionScore']
        player_data['Pinks Purchased'] = participant['visionWardsBoughtInGame']
        player_data['Wards Placed'] = participant['wardsPlaced']
        player_data['Wards Destroyed'] = participant['wardsKilled']
        # Gold and Exp #
        player_data['Gold Earned'] = participant['goldEarned']
        player_data['Champion Level'] = participant['champLevel']
        player_data['CS'] = participant['totalMinionsKilled'] + participant['neutralMinionsKilled']
        player_data['Minion Kills'] = participant['totalMinionsKilled']
        player_data['Jungle Minion Kills'] = participant['neutralMinionsKilled']
        ## Fun Stats ##
        player_data['Towers Destroyed'] = participant['turretKills']
        player_data['Inhibitors Destroyed'] = participant['inhibitorKills']
        player_data['CC Score'] = participant['timeCCingOthers']
        player_data['Damage per Minute'] = round(participant['challenges']['damagePerMinute'], 2)
        player_data['Gold per Minute'] = round(participant['challenges']['goldPerMinute'], 2)
        player_data['Vision per Minute'] = round(participant['challenges']['visionScorePerMinute'], 2)
        player_data['Winner'] = participant['win']
        player_data['Effective Healing And Shielding'] = participant['challenges']['effectiveHealAndShielding']
        player_data['Epic Monster Steals'] = participant['challenges']['epicMonsterSteals']
        player_data['Flawless Aces'] = participant['challenges']['flawlessAces']
        player_data['Aces'] = participant['challenges']['fullTeamTakedown']
        player_data['Multikills'] = participant['challenges']['multikills']
        player_data['Solo Kills'] = participant['challenges']['soloKills']

        player_values = list(player_data.values())#assigning the end values to a list

        updateTable(player_table_name, player_values)# inserting into table
        if player_data['Team'] == 'Blue':
            updateTeam(blue_team_name, player_name)
        if player_data['Team'] == 'Red':
            updateTeam(red_team_name, player_name)
    
    # print(player_values)

if __name__ == "__main__":
    main()
