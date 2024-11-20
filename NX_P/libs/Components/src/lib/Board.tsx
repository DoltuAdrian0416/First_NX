import { useEffect, useState } from 'react';
import './Board.scss';
import Square from './Square';
import { Game, Player, Values } from '@./Models';
import { v4 as uuidv4 } from 'uuid';
export interface BoardProps {
  setWinner: (winner: Player) => void;
  locked: boolean;
  size: number;
  players: Player[];
}

export function Board(props: BoardProps) {
  // const [markedRows, setMarkedRows] = useState(
  //   new Array(props.size * props.size).fill(Values.Empty)
  // );
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [game, setGame] = useState<Game>();
  useEffect(() => {
    const pickPlayerTurn = Math.floor(Math.random() * props.players.length);
    const randomPlayer = props.players[pickPlayerTurn];

    if (!randomPlayer) {
      return;
    }
    setCurrentPlayer(randomPlayer);

    const playerSymbolMap = new Map();
    playerSymbolMap.set(props.players[0].id, Values.X);
    playerSymbolMap.set(props.players[1].id, Values.O);

    setGame({
      id: uuidv4(),
      board: {
        size: props.size,
        rows: new Array(props.size * props.size).fill(Values.Empty),
      },
      playerSymbol: playerSymbolMap,
    });
  }, []);

  async function getAllGames() {
    const data = await fetch('http://localhost:5158/api/games');
    if (data.ok) {
      const result = await data.json();
      console.log(result);
    }
    console.log(data);
  }

  async function postGame(game: Game) {
    const obj = {
      id: game.id,
      endDate: game.endDate,
      player1: {
        id: props.players[0].id,
        name: props.players[0].name,
      },
      player2: {
        id: props.players[1].id,
        name: props.players[1].name,
      },
      winner: { id: game.winner?.id, name: game.winner?.name },
      board: { id: uuidv4(), size: game.board.size, rows: game.board.rows },
    };
    console.log(obj);
    const data = await fetch('http://localhost:5158/api/games', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    if (data.ok) {
      const result = await data.json();
      console.log(result);
    }
    console.log(data);
  }

  useEffect(() => {
    if (!game) {
      return;
    }

    const winnerSymbol = calculateWinner(game.board.rows, props.size);
    if (winnerSymbol && currentPlayer) {
      const newGame = {
        ...game,
        winner: currentPlayer,
        endDate: new Date(),
      };
      props.setWinner(currentPlayer);
      setGame(newGame);
      getAllGames();
      postGame(newGame);
    }
  }, [game?.board]);
  function generateWinningLines(size: number): number[][] {
    const lines: number[][] = [];

    // Horizontal lines
    for (let i = 0; i < size; i++) {
      const line = [];
      for (let j = 0; j < size; j++) {
        line.push(i * size + j);
      }
      lines.push(line);
    }

    // Vertical lines
    for (let i = 0; i < size; i++) {
      const line = [];
      for (let j = 0; j < size; j++) {
        line.push(j * size + i);
      }
      lines.push(line);
    }

    // Diagonal lines
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(i * size + i);
      diagonal2.push(i * size + (size - i - 1));
    }
    lines.push(diagonal1);
    lines.push(diagonal2);

    return lines;
  }

  function calculateWinner(rows: Array<Values>, size: number): Values | null {
    const winningLines = generateWinningLines(size);

    for (const line of winningLines) {
      const firstValue = rows[line[0]];
      if (
        firstValue !== Values.Empty &&
        line.every((index) => rows[index] === firstValue)
      ) {
        return firstValue;
      }
    }

    return null;
  }
  // function CalculateWinner(rows: Array<Values>) {
  //   console.log(rows);
  //   const winningLines3x3 = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  //   const winningLines4x4 = [
  //     [0, 1, 2, 3],
  //     [4, 5, 6, 7],
  //     [8, 9, 10, 11],
  //     [12, 13, 14, 15],

  //     [0, 4, 8, 12],
  //     [1, 5, 9, 13],
  //     [2, 6, 10, 14],
  //     [3, 7, 11, 15],

  //     [0, 5, 10, 15],
  //     [3, 6, 9, 12],
  //   ];
  //   const winningLines5x5 = [
  //     [0, 1, 2, 3, 4],
  //     [5, 6, 7, 8, 9],
  //     [10, 11, 12, 13, 14],
  //     [15, 16, 17, 18, 19],
  //     [20, 21, 22, 23, 24],

  //     [0, 5, 10, 15, 20],
  //     [1, 6, 11, 16, 21],
  //     [2, 7, 12, 17, 22],
  //     [3, 8, 13, 18, 23],
  //     [4, 9, 14, 19, 24],

  //     [0, 6, 12, 18, 24],
  //     [4, 8, 12, 16, 20],
  //   ];

  //   console.log('Calculate winner rows ' + rows);
  //   for (let i = 0; i < winningLines3x3.length; i++) {
  //     const [a, b, c] = winningLines3x3[i];
  //     if (
  //       rows[a] !== Values.Empty &&
  //       rows[a] === rows[b] &&
  //       rows[a] === rows[c]
  //     ) {
  //       return rows[a];
  //     }
  //   }
  //   return null;
  // }

  // for (let i = 0; i < game?.board.rows.length; i++) {
  //   rows.push(
  //     <Square
  //       onClick={() => {
  //         if (props.locked) {
  //           return;
  //         }
  //         if (Game[i] !== Values.Empty) {
  //           return;
  //         }
  //         const GameCopy = [...Game];
  //         GameCopy[i] =  === 0 ? Values.O : Values.X;
  //         setGame(GameCopy);
  //         setPlayer(player === 0 ? 1 : 0);
  //       }}
  //       value={Game[i]}
  //     />
  //   );
  // }

  return (
    <div className={`board${props.size.toString()}`}>
      {game?.board.rows.map((value, i) => {
        return (
          <Square
            key={i}
            onClick={() => {
              if (props.locked) {
                return;
              }
              if (!currentPlayer) {
                return;
              }
              if (value !== Values.Empty) {
                return;
              }
              const currentPlayerId = currentPlayer.id;
              const currentSymbol = game.playerSymbol.get(currentPlayerId);
              if (!currentSymbol) {
                return;
              }
              const rowsCopy = [...game.board.rows];
              rowsCopy[i] = currentSymbol;

              setGame({
                ...game,
                board: {
                  ...game.board,
                  rows: rowsCopy,
                },
              });
              const filteredPlayers = props.players.filter((player) => {
                return player !== currentPlayer;
              });

              setCurrentPlayer(filteredPlayers[0]);
            }}
            value={value}
          />
        );
      })}
    </div>
  );
}
