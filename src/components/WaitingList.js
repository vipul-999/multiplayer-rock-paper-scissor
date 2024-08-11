import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWaitingList, startGame } from "../reducers/gameSlice";

const WaitingList = () => {
  const waitingList = useSelector((state) => state.game.waitingList);
  const players = useSelector((state) => state.game.players);
  const dispatch = useDispatch();

  const handleStartGame = (player1, player2) => {
    dispatch(startGame({ player1: player1, player2: player2 }));
    dispatch(removeFromWaitingList(player2));
  };

  return (
    <div>
      <h2>Waiting List</h2>
      {waitingList.length > 0 ? (
        <ul>
          {waitingList.map((player, index) => (
            <li key={index}>
              {player.username}
              {players.length > 0 && (
                <button onClick={() => handleStartGame(players[0], player)}>
                  Play
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players in the waiting list</p>
      )}
    </div>
  );
};

export default WaitingList;
