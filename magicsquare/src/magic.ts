const sum = (a: number, b: number) => a + b;
const and = (a: boolean, b: boolean) => a && b;

export interface SumIsMagic {
  sum: number;
  isMagic: boolean;
}

function isMagic(sim: SumIsMagic): boolean {
  return sim.isMagic;
}

export interface MagicResult {
  globalIsMagic: boolean;
  rowSums: SumIsMagic[];
  columnsSums: SumIsMagic[];
  diagSums: SumIsMagic[];
}

export function computeMagic(squares: number[][], size: number): MagicResult {
  const magicSum = (size * (size * size + 1)) / 2;

  function plusIsMagic(s: number): SumIsMagic {
    return { sum: s, isMagic: s === magicSum };
  }

  const rowSums = squares.map((row) => row.reduce(sum)).map(plusIsMagic);
  const columnsSums = [...Array(size).keys()]
    .map((j) => [...Array(size).keys()].map((i) => squares[i][j]).reduce(sum))
    .map(plusIsMagic);
  const diagSum1 = [...Array(size).keys()]
    .map((i) => squares[i][i])
    .reduce(sum);
  const diagSum2 = [...Array(size).keys()]
    .map((i) => squares[i][size - i - 1])
    .reduce(sum);
  const diagSums = [diagSum1, diagSum2].map(plusIsMagic);
  const globalIsMagic =
    rowSums.map(isMagic).reduce(and) &&
    columnsSums.map(isMagic).reduce(and) &&
    diagSums.map(isMagic).reduce(and);
  return {
    globalIsMagic: globalIsMagic,
    rowSums: rowSums,
    columnsSums: columnsSums,
    diagSums: diagSums
  };
}
