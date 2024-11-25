import { Game, Player, Values } from '@./Models';
import './BoardController.scss';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

interface BoardControllerProps {
  game: Game | undefined;
  size: number;
  setGame: (game: Game) => void;
  setPlayer1: (player1: Player | undefined) => void;
  setPlayer2: (player2: Player | undefined) => void;
  setWinner: (winner: Player | undefined) => void;
}
export function BoardController(props: BoardControllerProps) {
  const navigate = useNavigate();
  return (
    <div className={'controller'}>
      <button
        className={'btnConfirm'}
        data-testid="BackButton"
        onClick={() => {
          props.setPlayer1(undefined);
          props.setPlayer2(undefined);
          navigate('/');
        }}
      >
        Back
      </button>
      <button
        data-testid="ResetButton"
        className={'btnConfirm'}
        onClick={() => {
          if (!props.game) {
            return;
          }
          props.setWinner(undefined);
          props.setGame({
            ...props.game,
            id: uuidv4(),
            board: {
              size: props.size,
              rows: new Array(props.size * props.size).fill(Values.Empty),
            },
          });
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default BoardController;
