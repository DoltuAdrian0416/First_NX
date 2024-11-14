import { Board, UserForm } from '@./Components';
import styles from './app.module.scss';
import { useState } from 'react';
import { Player } from '@./Models';
export function App() {
  const [winner, setWinner] = useState<Player>();
  const [reset, setReset] = useState(0);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const [size, setSize] = useState(3);

  return (
    <div className={styles.wrapper}>
      {!player1 && !player2 && (
        <UserForm
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          setSize={setSize}
          size={size}
        />
      )}
      {player1 && player2 && (
        <div className={styles.wrapper}>
          {winner && <h1>The winner is : {winner.name} </h1>}

          <Board
            key={reset}
            setWinner={setWinner}
            locked={!!winner}
            size={size}
            players={[player1, player2]}
          ></Board>

          <div className={styles.controller}>
            <button
              className={styles.btnConfirm}
              data-testid="BackButton"
              onClick={() => {
                setWinner(undefined);
                setReset(reset + 1);
                setPlayer1(undefined);
                setPlayer2(undefined);
                setSize(size);
              }}
            >
              Back
            </button>
            <button
              data-testid="ResetButton"
              className={styles.btnConfirm}
              onClick={() => {
                setWinner(undefined);
                setReset(reset + 1);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
