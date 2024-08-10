import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateScores, endGame, updateGameState, startGame } from '../reducers/gameSlice';
import '../styles/Game.css';
import rockImg from '../assets/rock.png';  
import paperImg from '../assets/paper.png';  
import scissorsImg from '../assets/scissors.png';  
import rotatingImg from '../assets/rotating.png';  

const ChoiceMap = {
  Rock: rockImg,
  Paper: paperImg,
  Scissors: scissorsImg
}

const Game = () => {
  const currentGame = useSelector((state) => state.game.gameState);
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const dispatch = useDispatch();
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [myGame, setMyGame] = useState(currentGame);
  const [result, setResult] = useState(''); 
  const [gameEnded, setGameEnded] = useState(false); 

  const determineWinner = () => {
    setResult("");
    if (player1Choice === player2Choice) {
      setResult('Draw');
      return;
    }

    const result = (
      (player1Choice === 'Rock' && player2Choice === 'Scissors') ||
      (player1Choice === 'Scissors' && player2Choice === 'Paper') ||
      (player1Choice === 'Paper' && player2Choice === 'Rock')
    ) ? `${player1.username} wins!` : `${player2.username} wins!`;

    const winner = result === `${player1.username} wins!` ? player1 : player2;

    setTimeout(() => {
      dispatch(updateScores({ username: winner.username }));
      setResult(result);
    }, 2000); 
  };

  useEffect(() => {
    if (player1Choice && player2Choice) {
      determineWinner();
    }
  }, [player1Choice, player2Choice, gameEnded]);

  useEffect(() => {
    if (currentGame !== null) {
      setMyGame(currentGame);
      setPlayer1Choice(currentGame.player1Choice);
      setPlayer2Choice(currentGame.player2Choice);
    }
  }, [currentGame]);

  if (!currentGame) {
    return <h3>{currentPlayer.username}, you can start a new game. Choose a player from Lobby.</h3>;
  }

  const { player1, player2 } = currentGame;

  const refreshChoice = () => {
    setPlayer1Choice("");
    setPlayer2Choice("");
    setResult('');
  };

  const handleChoice = (player, choice) => {
    if (player === 'player1') {
      setPlayer1Choice(choice);
      dispatch(updateGameState({ ...myGame, player1Choice: choice }));
    } else {
      setPlayer2Choice(choice);
      dispatch(updateGameState({ ...myGame, player2Choice: choice }));
    }
  };

  const handleEndGame = () => {
    const result = (
      (player1Choice === 'Rock' && player2Choice === 'Scissors') ||
      (player1Choice === 'Scissors' && player2Choice === 'Paper') ||
      (player1Choice === 'Paper' && player2Choice === 'Rock')
    ) ? `${player1.username} wins!` : `${player2.username} wins!`;

    const winner = result === `${player1.username} wins!` ? player1 : player2;

    dispatch(endGame({ winner: winner.username }));
    setGameEnded(true);
    refreshChoice();
  };

  const renderChoiceStatus = (player) => {
    if (player === 'player1') {
      return player2Choice === '' ? 'Yet to choose' : 'Done choosing';
    }
    return player1Choice === '' ? 'Yet to choose' : 'Done choosing';
  };

  const renderPlayerChoice = (player) => {
    if (player === 'player1') {
      return player1Choice.length ? <img className='choice-icon' src={ChoiceMap[player1Choice]} alt={player1Choice}/> : null;
    }
    return player2Choice.length ? <img className='choice-icon' src={ChoiceMap[player2Choice]} alt={player2Choice}/> : null;
  };

  return (
    <div className="game-container">
      {currentPlayer.username !== player1.username && currentPlayer.username !== player2.username && (
        <h3>{currentPlayer.username}, you are in the waitlist as a game is already in progress.</h3>
      )}
      <div className='players-section'>
        <div className="player-section player1-section">
          <h3>{player1.username}: {currentPlayer.username === player2.username ? renderChoiceStatus('player2') : renderPlayerChoice('player1')}</h3>
          {currentPlayer.username === player1.username && (
            <div className="choices">
              <button className="choice-button" onClick={() => handleChoice('player1', 'Rock')}>
                <img src={rockImg} alt="Rock" />
              </button>
              <button className="choice-button" onClick={() => handleChoice('player1', 'Paper')}>
                <img src={paperImg} alt="Paper" />
              </button>
              <button className="choice-button" onClick={() => handleChoice('player1', 'Scissors')}>
                <img src={scissorsImg} alt="Scissors" />
              </button>
            </div>
          )}
        </div>
        <div className="player-section player2-section">
          <h3>{player2.username}: {currentPlayer.username === player1.username ? renderChoiceStatus('player1') : renderPlayerChoice('player2')}</h3>
          {currentPlayer.username === player2.username && (
            <div className="choices">
              <button className="choice-button" onClick={() => handleChoice('player2', 'Rock')}>
                <img src={rockImg} alt="Rock" />
              </button>
              <button className="choice-button" onClick={() => handleChoice('player2', 'Paper')}>
                <img src={paperImg} alt="Paper" />
              </button>
              <button className="choice-button" onClick={() => handleChoice('player2', 'Scissors')}>
                <img src={scissorsImg} alt="Scissors" />
              </button>
            </div>
          )}
        </div>
      </div>
      {currentPlayer.username !== player2.username && currentPlayer.username !== player1.username && (
        <div className="result">
          <h3>Game in progress</h3>
          <img className="rotating-image" src={rotatingImg} alt="Rotating" />
        </div>
      )}
      {player1Choice && player2Choice && (
        <div className="result">
          {result ? (
            <>
              <h3>Result: {result}</h3>
              {(currentPlayer.username === player2.username || currentPlayer.username === player1.username) && (
                <div className="result-buttons">
                  <button className="play-again-button" onClick={() => { refreshChoice(); dispatch(startGame({ player1, player2 })); }}>
                    Play Again
                  </button>
                  <button className="end-game-button" onClick={handleEndGame}>End Game</button>
                </div>
              )}
            </>
          ) : (
            <img className="rotating-image" src={rotatingImg} alt="Rotating" />
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
