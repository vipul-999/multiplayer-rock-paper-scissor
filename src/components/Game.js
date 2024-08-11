import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateScores,
  endGame,
  updateGameState,
  startGame,
} from "../reducers/gameSlice";
import "../styles/Game.css";
import rockImg from "../assets/rock.png";
import paperImg from "../assets/paper.png";
import scissorsImg from "../assets/scissors.png";
import rotatingImg from "../assets/rotating.png";

const ChoiceMap = {
  Rock: rockImg,
  Paper: paperImg,
  Scissors: scissorsImg,
};

const Game = () => {
  const currentGame = useSelector((state) => state.game.gameState);
  const currentPlayer = useSelector((state) => state.game.currentPlayer);
  const dispatch = useDispatch();
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [myGame, setMyGame] = useState(currentGame || {});
  const [result, setResult] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [error, setError] = useState(null);

  const { player1, player2 } = myGame;

  const determineWinner = () => {
    try {
      if (!player1Choice || !player2Choice || gameEnded) return;

      setResult("");
      if (player1Choice === player2Choice) {
        setResult("Draw");
        return;
      }

      const result =
        (player1Choice === "Rock" && player2Choice === "Scissors") ||
        (player1Choice === "Scissors" && player2Choice === "Paper") ||
        (player1Choice === "Paper" && player2Choice === "Rock")
          ? `${player1?.username} wins!`
          : `${player2?.username} wins!`;

      const winner =
        result === `${player1?.username} wins!` ? player1 : player2;

      setTimeout(() => {
        if (winner?.username === currentPlayer?.username)
          dispatch(updateScores({ username: winner?.username }));
        setResult(result);
        setGameEnded(true); // Prevent further score updates
      }, 2000);
    } catch (error) {
      console.error("Error determining the winner:", error);
      setError(
        "An error occurred while determining the winner. Please try again."
      );
    }
  };

  useEffect(() => {
    try {
      if (player1Choice && player2Choice && !gameEnded) {
        determineWinner();
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
      setError("An unexpected error occurred. Please refresh the page.");
    }
  }, [player1Choice, player2Choice, gameEnded]);

  useEffect(() => {
    try {
      if (currentGame !== null) {
        setMyGame(currentGame);
        setPlayer1Choice(currentGame.player1Choice);
        setPlayer2Choice(currentGame.player2Choice);
        setGameEnded(false);
      }
    } catch (error) {
      console.error("Error updating the game state:", error);
      setError(
        "An error occurred while updating the game state. Please try again."
      );
    }
  }, [JSON.stringify(currentGame)]);

  if (error) {
    return <h3>{error}</h3>;
  }

  if (!currentGame) {
    return (
      <h3>
        {currentPlayer?.username}, you can start a new game. Choose a player
        from the Lobby.
      </h3>
    );
  }

  const refreshChoice = () => {
    setPlayer1Choice("");
    setPlayer2Choice("");
    setResult("");
    setGameEnded(false);
    setError(null);
  };

  const handleChoice = (player, choice) => {
    try {
      if (player === "player1") {
        setPlayer1Choice(choice);
        dispatch(updateGameState({ ...myGame, player1Choice: choice }));
      } else {
        setPlayer2Choice(choice);
        dispatch(updateGameState({ ...myGame, player2Choice: choice }));
      }
    } catch (error) {
      console.error("Error handling choice:", error);
      setError("An error occurred while making a choice. Please try again.");
    }
  };

  const handleEndGame = () => {
    try {
      dispatch(endGame());
      refreshChoice();
    } catch (error) {
      console.error("Error ending the game:", error);
      setError("An error occurred while ending the game. Please try again.");
    }
  };

  const renderChoiceStatus = (player) => {
    try {
      if (player === "player1") {
        return player2Choice === "" ? "Yet to choose" : "Done choosing";
      }
      return player1Choice === "" ? "Yet to choose" : "Done choosing";
    } catch (error) {
      console.error("Error rendering choice status:", error);
      setError("An error occurred while rendering the choice status.");
    }
  };

  const renderPlayerChoice = (player) => {
    try {
      if (player === "player1") {
        return player1Choice.length ? (
          <img
            className="choice-icon"
            src={ChoiceMap[player1Choice]}
            alt={player1Choice}
          />
        ) : null;
      }
      return player2Choice.length ? (
        <img
          className="choice-icon"
          src={ChoiceMap[player2Choice]}
          alt={player2Choice}
        />
      ) : null;
    } catch (error) {
      console.error("Error rendering player choice:", error);
      setError("An error occurred while rendering the player choice.");
    }
  };

  return (
    <div className="game-container">
      {currentPlayer?.username !== player1?.username &&
        currentPlayer?.username !== player2?.username && (
          <h3>
            {currentPlayer?.username}, you are in the waitlist as a game is
            already in progress.
          </h3>
        )}
      <div className="players-section">
        <div className="player-section player1-section">
          <h3>
            {player1?.username}:{" "}
            {currentPlayer?.username === player2?.username
              ? renderChoiceStatus("player2")
              : renderPlayerChoice("player1")}
          </h3>
          {currentPlayer?.username === player1?.username && (
            <div className="choices">
              <button
                className="choice-button"
                onClick={() => handleChoice("player1", "Rock")}
              >
                <img src={rockImg} alt="Rock" />
              </button>
              <button
                className="choice-button"
                onClick={() => handleChoice("player1", "Paper")}
              >
                <img src={paperImg} alt="Paper" />
              </button>
              <button
                className="choice-button"
                onClick={() => handleChoice("player1", "Scissors")}
              >
                <img src={scissorsImg} alt="Scissors" />
              </button>
            </div>
          )}
        </div>
        <div className="player-section player2-section">
          <h3>
            {player2?.username}:{" "}
            {currentPlayer?.username === player1?.username
              ? renderChoiceStatus("player1")
              : renderPlayerChoice("player2")}
          </h3>
          {currentPlayer?.username === player2?.username && (
            <div className="choices">
              <button
                className="choice-button"
                onClick={() => handleChoice("player2", "Rock")}
              >
                <img src={rockImg} alt="Rock" />
              </button>
              <button
                className="choice-button"
                onClick={() => handleChoice("player2", "Paper")}
              >
                <img src={paperImg} alt="Paper" />
              </button>
              <button
                className="choice-button"
                onClick={() => handleChoice("player2", "Scissors")}
              >
                <img src={scissorsImg} alt="Scissors" />
              </button>
            </div>
          )}
        </div>
      </div>
      {currentPlayer?.username !== player2?.username &&
        currentPlayer?.username !== player1?.username && (
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
              {(currentPlayer?.username === player2?.username ||
                currentPlayer?.username === player1?.username) && (
                <div className="result-buttons">
                  <button
                    className="play-again-button"
                    onClick={() => {
                      refreshChoice();
                      dispatch(startGame({ player1, player2 }));
                    }}
                  >
                    Play Again
                  </button>
                  <button className="end-game-button" onClick={handleEndGame}>
                    End Game
                  </button>
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
