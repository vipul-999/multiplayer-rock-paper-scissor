import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenForStorageChanges } from './actions/listenForStorageChanges';
import Game from './components/Game';
import PlayerCard from './components/PlayerCard';
import Leaderboard from './components/Leaderboard';
import Lobby from './components/Lobby';
import './App.css';
import { resetState } from './reducers/gameSlice'; // Import reset action

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenForStorageChanges());
  }, [dispatch]);

  const handleReset = () => {
    dispatch(resetState()); // Dispatch the reset action
  };

  return (
    <div className="App">
      <h1 className="blinking-text">Multiplayer Rock-Paper-Scissors</h1>
      <button className="reset-button" onClick={handleReset}>Reset</button>
      <div className="container">
        <div className="game">
          <PlayerCard />
          <Game />
        </div>
        <div className="leaderboard">
          <Leaderboard />
        </div>
        <div className="waiting-list">
          <Lobby />
        </div>
      </div>
    </div>
  );
};

export default App;
