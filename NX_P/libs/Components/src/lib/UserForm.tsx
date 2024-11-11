import { useEffect, useState } from 'react';
import styles from './UserForm.module.scss';
import './UserForm.module.scss';
import { Player } from '@./Models';
import { v4 as uuidv4 } from 'uuid';
interface FormProps {
  setPlayer1: (player: Player) => void;
  setPlayer2: (player: Player) => void;
  setSize: (size: number) => void;
}
export function UserForm(props: FormProps) {
  const [player1, setPlayer1Name] = useState('');
  const [player2, setPlayer2Name] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
    }
  }, [player1, player2]);

  const gameSize = [3, 4, 5];

  return (
    <div className={styles.container}>
      <h1>
        Welcome , please insert your name. {player1} {player2}
      </h1>

      <div className="playerInputs">
        <input
          type="text"
          placeholder="Player1"
          onChange={(e) => {
            setPlayer1Name(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Player2"
          onChange={(e) => {
            setPlayer2Name(e.target.value);
          }}
        ></input>

        {clicked && (!player1 || !player2) && (
          <h2 className={styles.error}>Please enter valid names</h2>
        )}
      </div>
      <div className={styles.selectSize}>
        {gameSize.map((size, index) => (
          <button
            key={index}
            className={styles.sizeBtn}
            onClick={() => {
              props.setSize(size);
            }}
          >
            {size} * {size}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setClicked(true);
          props.setPlayer1({ name: player1, id: uuidv4() });
          props.setPlayer2({ name: player2, id: uuidv4() });
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default UserForm;
