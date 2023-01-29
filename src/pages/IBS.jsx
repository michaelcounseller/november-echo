import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCounter } from "../App";

const IBS = () => {
  let rank, winrate, prevRank;
  const [playerArr, setPlayerArr] = useState([]);
  const [player, setPlayer] = useState();
  const [playerName, setPlayerName] = useState("");
  const [counter, setID] = useCounter();

  useEffect(() => {
    console.log("Fetching...");
    fetch("http://127.0.0.1:8000/api/player")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayer(data.player);
      });
  }, []);

  const handleClickE = () => {
    setPlayerArr((oldArr) => [...oldArr, playerObj]);
    setID((oldCount) => oldCount + 1);
    console.log(playerArr, counter);
  };

  let playerObj = {
    id: counter,
    name: playerName,
    rank: rank,
    winrate: winrate,
    prevR: prevRank,
  };

  return (
    <>
      <div>IBS</div>

      <TextField
        id="outlined-name-input"
        label="Enter Player Name"
        type="name"
        autoComplete="current-password"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button onClick={handleClickE}>Boop</Button>
      <Typography>
        
          Current players:
          {player
            ? player.map((player) => {
                return (
                  <>
                    <p><Link to={`/player/${player.name}`}>{player.name}</Link></p>
                  </>
                );
              })
            : null}
        {playerArr.map((player) => (
          <div key={player.id}>
            <li>
              <h1>{player.id}</h1>
              <h1>{player.name}</h1>
              <h1>{player.rank}</h1>
            </li>
          </div>
        ))}
      </Typography>
    </>
  );
};

export default IBS;
