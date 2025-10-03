import Square from "./Square";
import styles from "./Board.module.css";

export default function Board({ squares, onClick, winnerLine }) {
  return (
    <div className={styles.board}>
      {squares.map((val, i) => {
        const isWinner = winnerLine ? winnerLine.includes(i) : false;
        return (
          <Square
            highlight={isWinner}
            key={i}
            value={val}
            onClick={() => onClick(i)}
          />
        );
      })}
    </div>
  );
}
