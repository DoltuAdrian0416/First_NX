import { useEffect, useState } from 'react';
import './Board.scss';
import { Game, Player } from '@./Models';
import BoardController from './BoardController';
import GenerateBoard from './GenerateBoard';
import { useParams } from 'react-router-dom';

export interface BoardProps {
  setWinner: (winner: Player | undefined) => void;
  setPlayer1: (player1: Player | undefined) => void;
  setPlayer2: (player2: Player | undefined) => void;
  setSize: (size: number) => void;
  locked: boolean;
  size: number;
  players: Player[];
  game: Game | undefined;
}

export function Board(props: BoardProps) {
  const [game, setGame] = useState<Game>();
  const { id } = useParams<{ id: string }>();
  //FETCH ALL GAMES
  // async function getAllGames() {
  //   const data = await fetch('http://localhost:5158/api/games');
  //   if (data.ok) {
  //     const result = await data.json();
  //     console.log(result);
  //   }
  //   console.log(data);

  async function getGamesByID(id: string) {
    const data = await fetch(
      `http://localhost:5158/api/games/game/{id}?id=${id}`
    );
    if (data.ok) {
      const result = await data.json();
      // console.log(result);
      return result;
    }
  }
  useEffect(() => {
    if (!id) {
      return;
    }

    getGamesByID(id).then((result: Game) => {
      setGame(result);

      props.setSize(result.board.size);
    });
  }, [id]);

  return (
    <div className={'boardContainer'}>
      <GenerateBoard
        size={props.size}
        game={game}
        setGame={setGame}
        locked={props.locked}
        players={props.players}
        setWinner={props.setWinner}
        idGame={id}
      />
      <BoardController
        game={game}
        size={props.size}
        setPlayer1={props.setPlayer1}
        setPlayer2={props.setPlayer2}
        setGame={setGame}
        setWinner={props.setWinner}
      />
    </div>
  );
}
