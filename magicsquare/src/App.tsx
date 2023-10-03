import { useState } from "react";

function Square({ value }: { value: number }) {
  const valueDisplayed = value === 0 ? " " : `${value}`;
  return <div className="square">{valueDisplayed}</div>;
}

function Board({ squares }: { squares: number[][] }) {
  return (
    <div>
      {squares.map((row, i) => (
        <div className="board-row">
          {row.map((n, j) => {
            const myKey = `${i}_${j}`;
            console.log(myKey);
            return <Square key={myKey} value={0} />;
          })}
        </div>
      ))}
    </div>
  );
}

function Numbers({ numbers }: { numbers: number[] }) {
  return (
    <div className="nbStack">
      {numbers.map((n) => (
        <div key={n} className="nb">
          {n}
        </div>
      ))}
    </div>
  );
}

export default function MyApp() {
  const n = 3;
  // numbers to place on the board
  const [numbers, setNumbers] = useState(
    [...Array(n * n).keys()].map((i) => i + 1)
  );
  // numbers placed on the board (0 if empty)
  const [squares, setSquares] = useState(
    Array(n)
      .fill(0)
      .map(() => new Array(n).fill(0))
  );
  return (
    <div className="game">
      <Board squares={squares} />
      <Numbers numbers={numbers} />
    </div>
  );
}
