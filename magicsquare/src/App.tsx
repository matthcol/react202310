import { useState } from "react";

function makeArray(n: number): number[] {
  return [...Array(n).keys()].map((i) => i + 1);
}

function makeArray2D(n: number): number[][] {
  return Array(n)
    .fill(0)
    .map(() => new Array(n).fill(0));
}

function Square({
  value,
  actionSquare
}: {
  value: number;
  actionSquare?: () => void;
}) {
  // console.log("Square: value = ", value);
  const valueDisplayed = value === 0 ? " " : `${value}`;
  // console.log("Square: value displayed= ", valueDisplayed);
  return (
    <div className="square" onClick={actionSquare}>
      {valueDisplayed}
    </div>
  );
}

function Board({
  squares,
  actionSquare
}: {
  squares: number[][];
  actionSquare?: (i: number, j: number) => void;
}) {
  console.log("(re)display board:", squares);
  return (
    <div>
      {squares.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((n, j) => {
            const myKey = `${i}_${j}`;
            // console.log(myKey);
            return (
              <Square
                key={myKey}
                value={n}
                actionSquare={() => actionSquare(i, j)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Numbers({
  numbers,
  numberSelected,
  action
}: {
  numbers: number[];
  numberSelected: number;
  action: (n: number) => void;
}) {
  return (
    <div className="nbStack">
      {numbers.map((n) => (
        <div
          key={n}
          className={n === numberSelected ? "nb-selected" : "nb"}
          onClick={() => action(n)}
        >
          {n}
        </div>
      ))}
    </div>
  );
}

export default function MyApp() {
  const [size, setSize] = useState(3);
  // numbers to place on the board
  const [numbers, setNumbers] = useState(makeArray(size * size));
  // numbers placed on the board (0 if empty)
  const [squares, setSquares] = useState(makeArray2D(size));

  const [numberSelected, setNumberSelected] = useState(0);

  function resetGame(event) {
    const newSize = parseInt(event.target.value, 10);
    if (newSize <= 0) return;
    setSize(newSize);
    setNumberSelected(0);
    setNumbers(makeArray(newSize * newSize));
    setSquares(makeArray2D(newSize));
  }

  function selectNumber(n: number) {
    // console.log("Number selected:", n);
    setNumberSelected(n);
  }

  // function squareClic(i: number, j: number) {
  //   // fake action here as a prototype
  //   console.log("Clic square:", i, j);
  //   const nextSquares = squares.slice();
  //   ++nextSquares[i][j];
  //   console.log("Next square:", nextSquares);
  //   setSquares(nextSquares);
  // }

  function squareClic(i: number, j: number) {
    // fake action here as a prototype
    console.log("Clic square:", i, j);
    const nextSquares = squares.slice();
    nextSquares[i][j] = numberSelected;
    console.log("Next square:", nextSquares);
    setSquares(nextSquares);
  }

  return (
    <>
      <input type="number" value={size} onChange={resetGame} />
      <div className="game">
        <Board squares={squares} actionSquare={squareClic} />
        <Numbers
          numbers={numbers}
          numberSelected={numberSelected}
          action={selectNumber}
        />
      </div>
    </>
  );
}
