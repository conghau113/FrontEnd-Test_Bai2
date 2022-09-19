import React, { useEffect, useState, useRef } from "react";
import Board from "./components/Board";
import "./index.css";
import "./App.scss";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // player
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  // Timer
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  // disadble button
  // const [disable, setDisable] = useState(false);

  const handleClick = (i) => {
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setSquares(squares);
    setXIsNext(!xIsNext);
  };

  // check winner phayer
  const winner = checkWinner(squares);
  let status;
  if (winner) {
    winner === "O"
      ? (status = "Player Winner: " + `${playerO}`)
      : (status = "Player Winner: " + `${playerX}`);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  // reset button
  const handleClickReset = () => {
    setSquares(Array(9).fill(null));
  };

  //set timmer
  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    // console.log("subsequent renders");
    // console.log(start);
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      // console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    console.log("seconds " + seconds);
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return (
      mins.toString() + ":" + (seconds_ === 0 ? "00" : seconds_.toString())
    );
  };

  return (
    <>
      <div className="player">
        <div className="playerX">
          <lable /> Player: X
          <input
            onChange={(e) => setPlayerX(e.target.value)}
            value={playerX}
            type="text"
            placeholder="Enter name..."
          />
        </div>
        <div className="playerO">
          <lable for="playerO" /> Player: O
          <input
            onChange={(e) => setPlayerO(e.target.value)}
            value={playerO}
            type="text"
            placeholder="Enter name..."
          />
        </div>
      </div>
      <div className="pomView">
        <div className="startDiv">
          {/* event handler onClick is function not function call */}
          <button className="startBut" onClick={toggleStart}>
            {!start ? "START GAME" : "PAUSE"}
          </button>
        </div>
        <p>{dispSecondsAsMins(timer)}</p>
      </div>
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
      <button className="playAgain" onClick={handleClickReset}>
        Play Again
      </button>
    </>
  );
}



function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
