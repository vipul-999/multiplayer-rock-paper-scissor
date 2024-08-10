import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinGame, setCurrentPlayer } from '../reducers/gameSlice';
import '../styles/PlayerCard.css'; // Import the CSS file

const PlayerCard = () => {
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleJoin = () => {
    if (username.trim()) {
      dispatch(joinGame({ username }));
      // localStorage.setItem('username', username);
    }
  };

  //to retain current tab user
  useEffect(()=>{
    if(window.name!==''){
      dispatch(setCurrentPlayer({ username:window.name }));
    }
  },[])
  

  // Only show the PlayerCard if no player has joined yet (username is empty)
  if (currentPlayer.username!='') {
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
        />
        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
};

export default PlayerCard;
