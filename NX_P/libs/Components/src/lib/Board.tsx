import { useEffect, useState } from 'react';
import styles from './Board.module.scss';
import Square from './Square';

export enum Values {
  Empty,
  O,
  X,
}
interface BoardProps {
  setWinner: (winner: string) => void;
  locked: boolean;
  size: number;
}

export function Board(props: BoardProps) {
  const rows = [];
  const [markedRows, setMarkedRows] = useState(
    new Array(props.size * props.size).fill(Values.Empty)
  );
  const [player, setPlayer] = useState(Math.floor(Math.random() * 1 + 1));

  useEffect(() => {
    const winner = CalculateWinner(markedRows);
    if (winner) {
      props.setWinner(Values[winner]);
    }
  }, [markedRows]);

  function CalculateWinner(rows: Array<Values>) {
    console.log(rows);
    const winningLines3x3 = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winningLines4x4 = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],

      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],

      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];
    const winningLines5x5 = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],

      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],

      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    console.log('Calculate winner rows ' + rows);
    for (let i = 0; i < winningLines3x3.length; i++) {
      const [a, b, c] = winningLines3x3[i];
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
          if (props.locked) {
            return;
          }
          if (markedRows[i] !== Values.Empty) {
            return;
          }
          const markedRowsCopy = [...markedRows];
          markedRowsCopy[i] = player === 0 ? Values.O : Values.X;
          setMarkedRows(markedRowsCopy);
          setPlayer(player === 0 ? 1 : 0);
        }}
        value={markedRows[i]}
      />
    );
  }

  return <div className={styles.board3x3}>{rows}</div>;
}
