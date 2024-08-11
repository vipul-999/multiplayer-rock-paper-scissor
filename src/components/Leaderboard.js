import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/Leaderboard.css"; 

const Leaderboard = () => {
  const leaderboard = useSelector((state) => state.game.leaderboard);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!leaderboard) {
        throw new Error("Failed to load leaderboard data.");
      }
      setError(null); 
    } catch (err) {
      setError(err.message);
    }
  }, [leaderboard]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ol>
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((player, index) => (
              <li key={index} className={index === 0 ? "highlight" : ""}>
                {index + 1}. {player.username}: {player.score}
              </li>
            ))
          ) : (
            <p>No players available</p>
          )}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;
