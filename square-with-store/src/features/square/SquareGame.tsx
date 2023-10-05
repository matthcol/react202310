import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { changeSize, loadSquare, selectNumbers, selectSize, selectSquares } from "./squareSlice"
import styles from "./SquareGame.module.css"
import { useAddNewSquareMutation } from "../../api/squareApiSlice";

function Square({
    value,
    hintOk,
    blank = false
  }: {
    value: number;
    hintOk?: boolean;
    blank?: boolean;
  }) {
    console.log("Square: value = ", value);
    const valueDisplayed = value === 0 ? " " : `${value}`;
    console.log("Square: value displayed= ", valueDisplayed);
    let squareClass = styles.square;
    if (blank) {
      squareClass = `${styles.hintBlank} ${squareClass}`;
    } else if (typeof hintOk !== "undefined") {
      const otherSquareClass = hintOk ? styles.hintOk : styles.hintKo;
      squareClass = `${otherSquareClass} ${squareClass}`;
    }
    return <div className={squareClass}>{valueDisplayed}</div>;
  }
  
function Board() {
const squares = useAppSelector(selectSquares);
const showHint = false;
console.log(squares);
return (
    <div>
        {showHint && (
            <div className={styles.boardRow}>
            {[...squares.keys()].map((j) => (
                <Square key={`blank_${j}`} value={0} blank={true} />
            ))}
            <Square key="hint_diag1" value={0} hintOk={false} />
            </div>
        )}
        {squares.map((row, i) => (
            <div key={i} className="board-row">
            {row.map((n, j) => {
                const myKey = `${i}_${j}`;
                return <Square key={myKey} value={n} />;
            })}
            {showHint && <Square key={`hint_row${i}`} value={0} hintOk={false} />}
            </div>
        ))}
        {showHint && (
            <div className={styles.boardRow}>
            {[...squares.keys()].map((j) => (
                <Square key={`hint_col${j}`} value={0} hintOk={false} />
            ))}
            <Square key="hint_diag2" value={0} hintOk={false} />
            </div>
        )}
    </div>
    );
}
  
function Numbers(){
    const numbers = useAppSelector(selectNumbers);
    const numberSelected = 0;
    return (
      <div className={styles.nbStack}>
        {numbers.map((n) => (
          <button
            key={n}
            className={n === numberSelected ? styles.nbSelected : styles.nb}
            // onClick={() => action(n)}
          >
            {n}
          </button>
        ))}
      </div>
    );
}


export function SquareGame() {
    // const size = useAppSelector((state) => state.square.size) 
    const size = useAppSelector(selectSize);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h2>This is the Game in {size} x {size}</h2>
            <section>
                <div>
                    <label htmlFor="size">Change board size</label>
                    <input
                    id="size"
                    name="size"
                    type="number"
                    value={size}
                    onChange={(event) =>
                        dispatch(changeSize(parseInt(event.target.value,10)))
                    }
                    />
                </div>
                <div>
                    <button onClick={() => 
                        // fixed square
                        dispatch(loadSquare(`[ 
                            [138,	8,	17,	127,	114,	32,	41,	103,	90,	56,	65,	79],
                            [19,	125,	140,	6,	43,	101,	116,	30,	67,	77,	92,	54],
                            [128,	18,	7,	137,	104,	42,	31,	113,	80,	66,	55,	89],
                            [5,	139,	126,	20,	29,	115,	102,	44,	53,	91,	78,	68],
                            [136,	10,	15,	129,	112,	34,	39,	105,	88,	58,	63,	81],
                            [21,	123,	142,	4,	45,	99,	118,	28,	69,	75,	94,	52],
                            [130,	16,	9,	135,	106,	40,	33,	111,	82,	64,	57,	87],
                            [3,	141,	124,	22,	27,	117,	100,	46,	51,	93,	76,	70],
                            [134,	12,	13,	131,	110,	36,	37,	107,	86,	60,	61,	83],
                            [23,	121,	144,	2,	47,	97,	120,	26,	71,	73,	96,	50],
                            [132,	14,	11,	133,	108,	38,	35,	109,	84,	62,	59,	85],
                            [1,	143,	122,	24,	25,	119,	98,	48,	49,	95,	74,	72]]`))
                    }>Load Square</button>
                </div>
            </section>
            <div className={styles.game}>
                <Board />
                <Numbers />
            </div>
        </div>
    );
}