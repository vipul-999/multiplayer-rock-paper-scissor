import React from 'react';
import { useSelector } from 'react-redux';

const Leaderboard = () => {
  const leaderboard = useSelector((state) => state.game.leaderboard);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={index}>
            {player.username}: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
