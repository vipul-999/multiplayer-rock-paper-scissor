import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../reducers/gameSlice";

const Lobby = () => {
  const players = useSelector((state) => state.game.players);
  const currentGame = useSelector((state) => state.game.gameState);
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const handleStartGame = (player) => {
    try {
      if (!currentPlayer || !player) {
        throw new Error("Both players must be selected to start a game.");
      }
      if (currentGame !== null) {
        throw new Error("A game is already in progress.");
      }

      dispatch(startGame({ player1: currentPlayer, player2: player }));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <h3>Available Players:</h3>
      {players.length > 0 ? (
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.username}
              {currentPlayer.username === player.username ? (
                <span>(You)</span>
              ) : null}
              {currentPlayer.username !== player.username &&
                currentGame === null && (
                  <button
                    className="play-button"
                    onClick={() => handleStartGame(player)}
                  >
                    Play
                  </button>
                )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players available</p>
      )}
    </div>
  );
};

export default Lobby;
