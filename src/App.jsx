import { useState } from "react";
import Board from "./Board";
import CustomAlert from "./CustomAlert";
import styles from "./App.module.css";
import calcWinner from "./utils/calcWinner";
import computerMove from "./utils/computerMove";
import launchConfetti from "./utils/launchConfetti";

export default function App() {
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gameMode, setGameMode] = useState(""); // "pvp" أو "pvc"

  function updateStats(squares) {
    const calcWinnerInfo = calcWinner(squares);
    const winner = calcWinnerInfo ? calcWinnerInfo[0] : null;
    console.log(calcWinnerInfo);
    if (winner === "X") {
      launchConfetti("X");
      setPlayerOneWins((prev) => prev + 1);
    } else if (winner === "O") {
      launchConfetti("O");
      setPlayerTwoWins((prev) => prev + 1);
    } else if (isRoundEnd(squares)) {
      setDraws((prev) => prev + 1);
    }
  }

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleStart = (isComputer = false) => {
    const nameOne = playerOne.trim();
    console.log("isComputer : ", isComputer);
    if (isComputer) {
      console.log(" isComputer is true ");
      setPlayerTwo("Computer");
    }
    const nameTwo = isComputer ? "Computer" : playerTwo.trim();

    if (!nameOne || !nameTwo) {
      setAlertMessage("Please enter both player names!");
      setShowAlert(true);
      return;
    }

    if (nameOne.length >= 10 || nameTwo.length >= 10) {
      setAlertMessage("Please enter short names!");
      setShowAlert(true);
      return;
    }

    // All checks passed
    setGameStarted(true);
  };

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(i) {
    // ممنوع اللعب لو الخانة مش فاضية أو في فايز
    if (squares[i] || calcWinner(squares)) return;

    const next = squares.slice();

    // 👇 لو PvP → استخدم isXNext عادي
    if (gameMode === "pvp") {
      next[i] = isXNext ? "X" : "O";
      setSquares(next);
      setIsXNext(!isXNext);

      if (isRoundEnd(next) || calcWinner(next)) {
        updateStats(next);
      }
    }

    // 👇 لو PvC → اللاعب دايمًا X
    if (gameMode === "pvc" && isXNext) {
      next[i] = "X"; // اللاعب
      setSquares(next);
      setIsXNext(false);

      if (isRoundEnd(next) || calcWinner(next)) {
        updateStats(next);
        return;
      }

      // حركة الكمبيوتر
      const move = computerMove(next, "O", "X");
      if (move !== undefined) {
        setTimeout(() => {
          const afterComputer = next.slice();
          afterComputer[move] = "O";
          setSquares(afterComputer);
          setIsXNext(true);

          if (isRoundEnd(afterComputer) || calcWinner(afterComputer)) {
            updateStats(afterComputer);
          }
        }, 500);
      }
    }
  }

  function ResetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }
  function ResetScores() {
    setPlayerOneWins(0);
    setPlayerTwoWins(0);
    setDraws(0);
  }

  function isRoundEnd(squares) {
    return squares.every((square) => square !== null);
  }

  const calcWinnerInfo = calcWinner(squares);
  const winner = calcWinnerInfo ? calcWinnerInfo[0] : null;
  const winnerLine = calcWinnerInfo ? calcWinnerInfo[1] : null;

  if (!gameMode) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 className={styles.h2}>Choose Game Mode</h2>
        <button
          style={{ margin: "10px" }}
          className={styles.button}
          onClick={() => setGameMode("pvp")}
        >
          Player vs Player
        </button>
        <button
          style={{ margin: "10px" }}
          className={styles.button}
          onClick={() => {
            setGameMode("pvc");
            // setPlayerOne("Human");
            // setPlayerTwo("Computer");
            // setGameStarted(true);
          }}
        >
          Player vs Computer
        </button>
      </div>
    );
  }
  if (gameMode === "pvp" && !gameStarted) {
    // Pre-game screen
    return (
      <>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Enter Player Names</h1>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              type="text"
              placeholder="Player One"
              value={playerOne}
              onChange={(e) => setPlayerOne(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Player Two"
              value={playerTwo}
              onChange={(e) => setPlayerTwo(e.target.value)}
            />
          </div>

          <button className={styles.button} onClick={() => handleStart(false)}>
            Start Game
          </button>
        </div>
        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </>
    );
  }

  if (gameMode === "pvc" && !gameStarted) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Enter Your Name</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Your Name"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
        />
        <button
          style={{ margin: "10px" }}
          className={styles.button}
          onClick={() => {
            () => handleStart(true);
          }}
        >
          Start Game
        </button>
        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.game}>
      <h2
        className={`${styles.h2} ${
          winner
            ? winner === "X"
              ? styles.winnerX
              : styles.winnerO
            : isRoundEnd(squares)
            ? styles.draw
            : styles.nextPlayer
        }`}
      >
        {winner
          ? `Winner: ${winner === "X" ? playerOne : playerTwo}`
          : isRoundEnd(squares)
          ? "Round ended!"
          : `Next: ${isXNext ? playerOne : playerTwo}`}
      </h2>

      <Board winnerLine={winnerLine} squares={squares} onClick={handleClick} />

      <div className={styles.stats}>
        <div
          style={{ backgroundColor: "gold" }}
          className={`${styles.statsCard} ${styles.player1}`}
        >
          <span>{playerOne}</span>
          <span>{playerOneWins}</span>
        </div>
        <div
          style={{ backgroundColor: "darksalmon" }}
          className={`${styles.statsCard} ${styles.Draws}`}
        >
          <span>Draws</span>
          <span>{draws}</span>
        </div>
        <div
          style={{ backgroundColor: "gray" }}
          className={`${styles.statsCard} ${styles.player2}`}
        >
          <span>{playerTwo}</span>
          <span>{playerTwoWins}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          columnGap: "20px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button className={styles.button} onClick={ResetScores}>
          Reset Scores
        </button>
        <button className={styles.button} onClick={ResetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
