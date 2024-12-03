import { useEffect, useState } from 'react';
import './GameHistory.scss';
import { Game, Player } from '@./Models';
import { useNavigate } from 'react-router-dom';

interface GameHistoryInterface {
  setPlayer1: (player1: Player) => void;
  setPlayer2: (player2: Player) => void;
  setGame: (game: Game) => void;
}

export function GameHistory(props: GameHistoryInterface) {
  const [data, setData] = useState<Game[]>([]);
  const navigate = useNavigate();

  async function getAllGames() {
    const dataAPI = await fetch('http://localhost:5158/api/games');
    if (dataAPI.ok) {
      setData(await dataAPI.json());
      console.log(data);
    }
    // console.log(DataAPI);
  }

  useEffect(() => {
    getAllGames();
  }, []);
  return (
    <div className={'historyContainer'}>
      <button
        className={'returnBtn'}
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </button>
      {data.map((item, index) => (
        <div key={index} className={'gameContainer'}>
          <p className={`size size${item.board.size.toString()}`}>
            {item.board.size} x {item.board.size}
          </p>
          <div className={'gameDescription'}>
            <p>Winner : {item.winner?.name}</p>
            <button
              onClick={() => {
                props.setPlayer1(item.player1);
                props.setPlayer2(item.player2);
                navigate(`/game/${item.id}`);
              }}
            >
              Watch
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameHistory;
