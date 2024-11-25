import { Game, Player, Values } from '@./Models';
import './GenerateBoard.scss';
import Square from './Square';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
interface GenerateBoardInterface {
  size: number;
  game: Game | undefined;
  locked: boolean;
  players: Player[];
  setGame: (game: Game) => void;
  setWinner: (winner: Player) => void;
  idGame: string | undefined;
}

export function GenerateBoard(props: GenerateBoardInterface) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  //SETUP GAME ON 1ST RENDER
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
    props.setGame({
      id: uuidv4(),
      player1: props.players[0],
      player2: props.players[1],
      board: {
        size: props.size,
        rows: new Array(props.size * props.size).fill(Values.Empty),
      },
      playerSymbol: playerSymbolMap,
    });
  }, []);

  //POST GAME ON WIN
  async function postGame(game: Game) {
    if (props.idGame === game.id) {
      return;
    }
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
  //CALCULATE WINNER FOR EVERY MOVE ON BOARD
  useEffect(() => {
    if (!props.game) {
      return;
    }

    const winnerSymbol = calculateWinner(props.game.board.rows, props.size);
    if (winnerSymbol && currentPlayer) {
      const newGame = {
        ...props.game,
        winner: currentPlayer,
        endDate: new Date(),
      };
      props.setWinner(currentPlayer);
      props.setGame(newGame);
      postGame(newGame);
    }
  }, [props.game?.board]);

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
  return (
    <div className={`board${props.size.toString()}`}>
      {props.game?.board.rows.map((value, i) => {
        return (
          <Square
            key={i}
            onClick={() => {
              if (!props.game) {
                return;
              }
              if (!props.game.board.rows) {
                return;
              }
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
              const currentSymbol =
                props.game?.playerSymbol.get(currentPlayerId);
              if (!currentSymbol) {
                return;
              }
              const rowsCopy = [...props.game.board.rows];
              rowsCopy[i] = currentSymbol;

              props.setGame({
                ...props.game,
                board: {
                  ...props.game.board,
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

export default GenerateBoard;
