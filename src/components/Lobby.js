import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGame } from '../reducers/gameSlice';

const Lobby = () => {
  const players = useSelector((state) => state.game.players);
  const currentGame = useSelector((state) => state.game.gameState);
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  // const waitingList = useSelector((state) => state.game.waitingList);
  const dispatch = useDispatch();


  const handleStartGame = (player) => {
    // Add logic to start a game
    dispatch(startGame({ player1: currentPlayer, player2: player }));
  };

  return (
    <div>
      <h2>Lobby</h2>
      <h3>Available Players:</h3>
      {players.length > 0 ? (
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.username}
              {currentPlayer.username!==player.username && currentGame===null && <button className='play-button' onClick={() => handleStartGame(player)}>Play</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players available</p>
      )}
      {/* <h3>Waiting List:</h3>
      {waitingList.length > 0 ? (
        <ul>
          {waitingList.map((player, index) => (
            <li key={index}>{player.username}</li>
          ))}
        </ul>
      ) : (
        <p>No players in the waiting list</p>
      )} */}
    </div>
  );
};

export default Lobby;
