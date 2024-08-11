import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinGame, setCurrentPlayer } from "../reducers/gameSlice";
import "../styles/PlayerCard.css";

const PlayerCard = () => {
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleJoin = () => {
    if (username.trim()) {
      dispatch(joinGame({ username }));
      setError(""); 
    } else {
      setError("Username cannot be empty");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  useEffect(() => {
    if (window.name !== "") {
      dispatch(setCurrentPlayer({ username: window.name }));
    }
  }, [dispatch]);

  if (currentPlayer.username !== "") {
    return null;
  }

  return (
    <div className="backdrop">
      <div className="popup">
        <h2>Join Game</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          onKeyPress={handleKeyPress}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
};

export default PlayerCard;
