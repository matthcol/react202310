import { useState } from "react";
import { MagicResult, computeMagic } from "./magic";

enum StatusEnum {
  WIN = "win",
  LOOSE = "loose",
  PLAYING = "playing"
}

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
  actionSquare,
  hintOk,
  blank = false
}: {
  value: number;
  actionSquare?: () => void;
  hintOk?: boolean;
  blank?: boolean;
}) {
  // console.log("Square: value = ", value);
  const valueDisplayed = value === 0 ? " " : `${value}`;
  // console.log("Square: value displayed= ", valueDisplayed);
  let squareClass = "square";
  if (blank) {
    squareClass = `hint-blank ${squareClass}`;
  } else if (typeof hintOk !== "undefined") {
    const otherSquareClass = hintOk ? "hint-ok" : "hint-ko";
    squareClass = `${otherSquareClass} ${squareClass}`;
  }
  return (
    <div className={squareClass} onClick={actionSquare}>
      {valueDisplayed}
    </div>
  );
}

function Board({
  squares,
  actionSquare,
  showHint,
  magicResult
}: {
  squares: number[][];
  actionSquare?: (i: number, j: number) => void;
  showHint: boolean;
  magicResult?: MagicResult;
}) {
  console.log("(re)display board:", squares);
  return (
    <div>
      {showHint && (
        <div className="board-row">
          {[...squares.keys()].map((j) => (
            <Square key={`blank_${j}`} value={0} blank={true} />
          ))}
          <Square
            key="hint_diag1"
            value={magicResult?.diagSums[1].sum}
            hintOk={magicResult?.diagSums[1].isMagic}
          />
        </div>
      )}
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
          {showHint && (
            <Square
              key={`hint_row${i}`}
              value={magicResult?.rowSums[i].sum}
              hintOk={magicResult?.rowSums[i].isMagic}
            />
          )}
        </div>
      ))}
      {showHint && (
        <div className="board-row">
          {magicResult?.columnsSums.map((sim, j) => (
            <Square key={`hint_col${j}`} value={sim.sum} hintOk={sim.isMagic} />
          ))}
          <Square
            key="hint_diag2"
            value={magicResult?.diagSums[0].sum}
            hintOk={magicResult?.diagSums[0].isMagic}
          />
        </div>
      )}
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
        <button
          key={n}
          className={n === numberSelected ? "nb-selected" : "nb"}
          onClick={() => action(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

function PlayerStatus({
  numbers,
  magicResult
}: {
  numbers: number[];
  magicResult?: MagicResult;
}) {
  let playerStatus = StatusEnum.PLAYING;
  if (magicResult != null && numbers.length === 0) {
    playerStatus = magicResult.globalIsMagic
      ? StatusEnum.WIN
      : StatusEnum.LOOSE;
  }
  const statusClass = `status-${playerStatus}`;
  return <div className={statusClass}>{playerStatus}</div>;
}

function Hint({
  hintActivated,
  action
}: {
  hintActivated: boolean;
  action: () => void;
}) {
  return (
    <div>
      <input
        type="checkbox"
        id="hint"
        name="hint"
        checked={hintActivated}
        onChange={action}
      />
      <label htmlFor="hint">Hint</label>
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

  // const [playerStatus, setPlayerStatus] = useState(StatusEnum.PLAYING);

  const [showHint, setShowHint] = useState(false);

  const [magicResult, setMagicResult] = useState(null);

  function resetGame(newSize: number) {
    if (newSize <= 0) return;
    setSize(newSize);
    setNumberSelected(0);
    setNumbers(makeArray(newSize * newSize));
    setSquares(makeArray2D(newSize));
    setShowHint(false);
    setMagicResult(null);
  }

  function changeSize(event) {
    const n = parseInt(event.target.value, 10);
    // TODO: catch exception not a number
    resetGame(n);
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

  function transferNumberToBoard(i: number, j: number) {
    // update board
    const nextSquares = squares.slice();
    nextSquares[i][j] = numberSelected;
    setSquares(nextSquares);
    // update numbers stack
    const idx = numbers.indexOf(numberSelected);
    const nextNumbers = numbers.slice();
    nextNumbers.splice(idx, 1);
    setNumberSelected(0);
    setNumbers(nextNumbers);
    // update hints
    setMagicResult(computeMagic(nextSquares, size));
  }

  function pushBackNumberToStack(i: number, j: number) {
    const n = squares[i][j];
    // update board
    const nextSquares = squares.slice();
    nextSquares[i][j] = 0;
    setSquares(nextSquares);
    // update numbers stack
    let nextNumbers = numbers.slice();
    nextNumbers.push(n);
    nextNumbers.sort((a, b) => a - b);
    setNumbers(nextNumbers);
    // update hints
    setMagicResult(computeMagic(nextSquares, size));
  }

  function squareClic(i: number, j: number) {
    //console.log("Clic square:", i, j);
    if (squares[i][j] !== 0) {
      // sqaure already occupied
      // put back number in stack
      pushBackNumberToStack(i, j);
    } else if (numberSelected !== 0) {
      // transfer seleted number to empty square int the board
      transferNumberToBoard(i, j);
    } // else do nothing
  }

  function toggleHint() {
    if (showHint) {
      // hide hints
      console.log("Hide hints");
    } else {
      // show hints
      setMagicResult(computeMagic(squares, size));
      console.log("Show hints");
    }
    setShowHint((previousValue) => !previousValue);
  }

  return (
    <>
      <PlayerStatus numbers={numbers} magicResult={magicResult} />
      <div>
        <input type="number" value={size} onChange={changeSize} />
        <button onClick={() => resetGame(size)}>Reset Game</button>
        <Hint hintActivated={showHint} action={toggleHint} />
      </div>
      <div className="game">
        <Board
          squares={squares}
          actionSquare={squareClic}
          showHint={showHint}
          magicResult={magicResult}
        />
        <Numbers
          numbers={numbers}
          numberSelected={numberSelected}
          action={selectNumber}
        />
      </div>
    </>
  );
}
