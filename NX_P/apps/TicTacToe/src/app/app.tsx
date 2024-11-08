import { Board, UserForm } from '@./Components';
import styles from './app.module.scss';
import { useState } from 'react';
export function App() {
  const [winner, setWinner] = useState('');
  const [reset, setReset] = useState(0);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [size, setSize] = useState(0);
  return (
    <div className={styles.wrapper}>
      {!player1 && !player2 && (
        <UserForm
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          setSize={setSize}
        />
      )}
      {player1 && player2 && (
        <div className={styles.wrapper}>
          {winner && <h1>The winner is : {winner} </h1>}

          <Board key={reset} setWinner={setWinner} locked={!!winner}></Board>

          <button
            className={styles.btnConfirm}
            onClick={() => {
              setWinner('');
              setReset(reset + 1);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
