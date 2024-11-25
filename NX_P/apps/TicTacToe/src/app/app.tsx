import { Board, UserForm, GameHistory } from '@./Components';
import styles from './app.module.scss';
import { useState } from 'react';
import { Game, Player } from '@./Models';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
export function App() {
  const [winner, setWinner] = useState<Player>();
  const [reset, setReset] = useState(0);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const [size, setSize] = useState(3);
  const [game, setGame] = useState<Game>();
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Routes>
          <Route
            index
            path="/"
            element={
              !player1 &&
              !player2 && (
                <UserForm
                  setPlayer1={setPlayer1}
                  setPlayer2={setPlayer2}
                  setSize={setSize}
                  size={size}
                />
              )
            }
          ></Route>
          <Route
            path="/game"
            element={
              player1 &&
              player2 && (
                <div className={styles.wrapper}>
                  {winner && <h1>The winner is : {winner.name} </h1>}

                  <Board
                    key={reset}
                    setWinner={setWinner}
                    locked={!!winner}
                    size={size}
                    setSize={setSize}
                    players={[player1, player2]}
                    setPlayer1={setPlayer1}
                    setPlayer2={setPlayer2}
                    game={game}
                  ></Board>
                </div>
              )
            }
          />
          <Route
            path="/game/:id"
            element={
              player1 &&
              player2 && (
                <div className={styles.wrapper}>
                  {winner && <h1>The winner is : {winner.name} </h1>}

                  <Board
                    key={reset}
                    setWinner={setWinner}
                    locked={!!winner}
                    size={size}
                    setSize={setSize}
                    players={[player1, player2]}
                    setPlayer1={setPlayer1}
                    setPlayer2={setPlayer2}
                    game={game}
                  ></Board>
                </div>
              )
            }
          />
          <Route
            path={'/history'}
            element={
              <GameHistory
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                setGame={setGame}
              />
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
