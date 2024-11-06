import { Board } from '@./Components';
import styles from './app.module.scss';
import { useState } from 'react';
export function App() {
  const [winner, setWinner] = useState('');
  const [reset, setReset] = useState(0);
  return (
    <div className={styles.wrapper}>
      {winner && <h1>The winner is : {winner} </h1>}
      <Board key={reset} setWinner={setWinner} locked={!!winner}></Board>;
      <button
        onClick={() => {
          setWinner('');
          setReset(reset + 1);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
