import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useCounter } from "../App";


const IBS = () => {
  let rank, winrate, prevRank;
  const [playerArr, setPlayerArr] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [counter, setID] = useCounter()

  const handleClickE = () => {
    setPlayerArr((oldArr) => [...oldArr, playerObj]);
    setID(oldCount => oldCount + 1)
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
