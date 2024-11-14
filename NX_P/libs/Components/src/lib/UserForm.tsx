import { useEffect, useState } from 'react';
import styles from './UserForm.module.scss';
import './UserForm.module.scss';
import { Player } from '@./Models';
import { v4 as uuidv4 } from 'uuid';
export interface FormProps {
  setPlayer1: (player: Player) => void;
  setPlayer2: (player: Player) => void;
  setSize: (size: number) => void;
  size: number;
}
export function UserForm(props: FormProps) {
  const [player1, setPlayer1Name] = useState('');
  const [player2, setPlayer2Name] = useState('');
  const [clicked, setClicked] = useState(false);
  // const [currentSize, setCurrentSize] = useState(3);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
    }
  }, [player1, player2]);

  const gameSizes = [3, 4, 5];

  return (
    <div className={styles.container}>
      <h1>Welcome , please insert your name.</h1>

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
      </div>
      <h2>Please select the desireble board size</h2>
      <h4>
        Note : The combination needed to win increases as the board size does
      </h4>
      <div className={styles.selectSize}>
        {gameSizes.map((value, index) => (
          <button
            data-testid={'size' + value}
            key={index}
            id={'size' + value}
            className={`${styles.sizeBtn} ${
              props.size === value ? styles.isSelected : ' '
            }`}
            onClick={() => {
              // setCurrentSize(size);
              props.setSize(value);
              setClicked(true);
            }}
          >
            {value}x{value}
          </button>
        ))}
      </div>
      <button
        data-testid="confirmbtn"
        className={styles.btnConfirm}
        disabled={!player1 || !player2}
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
