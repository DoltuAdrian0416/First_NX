import { useEffect, useState } from 'react';
import styles from './Board.module.scss';
import Square from './Square';

export enum Values {
  O,
  X,
  Empty,
}
interface BoardProps {
  setWinner: (winner: string) => void;
  locked: boolean;
}

export function Board(props: BoardProps) {
  const rows = [];
  const [markedRows, setMarkedRows] = useState(new Array(9).fill(Values.Empty));
  const [player, setPlayer] = useState(Math.floor(Math.random() * 1 + 1));

  useEffect(() => {
    const winner = CalculateWinner(markedRows);
    if (winner) {
      props.setWinner(Values[winner]);
    }
  }, [markedRows]);

  function CalculateWinner(rows: Array<Values>) {
    console.log(rows);
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    console.log('Calculate winner rows ' + rows);
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (
        rows[a] !== Values.Empty &&
        rows[a] === rows[b] &&
        rows[a] === rows[c]
      ) {
        return rows[a];
      }
    }
    return null;
  }

  for (let i = 0; i < markedRows.length; i++) {
    rows.push(
      <Square
        onClick={() => {
          if (props.locked) return;
          const markedRowsCopy = [...markedRows];
          markedRowsCopy[i] = player === 0 ? Values.O : Values.X;
          setMarkedRows(markedRowsCopy);
          setPlayer(player === 0 ? 1 : 0);
        }}
        value={markedRows[i]}
      />
    );
  }

  return <div className={styles.board}>{rows}</div>;
}
