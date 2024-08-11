import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: JSON.parse(localStorage.getItem("players")) || [],
  leaderboard: JSON.parse(localStorage.getItem("leaderboard")) || [],
  waitingList: JSON.parse(localStorage.getItem("waitingList")) || [],
  gameState: JSON.parse(localStorage.getItem("gameState")) || null,
  currentPlayer: { username: "" },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    joinGame(state, action) {
      const { username } = action.payload;
      state.players.push({ username, score: 0 });
      state.currentPlayer = { username: username, score: 0 };
      window.name = username;
    },
    setCurrentPlayer(state, action) {
      const { username } = action.payload;
      state.currentPlayer = { username, score: 0 };
      window.name = username;
    },
    startGame(state, action) {
      const { player1, player2 } = action.payload;

      // Check if player1 is already in state.players; if not, add them
      if (!state.players.find((p) => p.username === player1.username)) {
        state.players.push(player1);
      }

      // Check if player2 is already in state.players; if not, add them
      if (!state.players.find((p) => p.username === player2.username)) {
        state.players.push(player2);
      }

      // Initialize the game state
      state.gameState = {
        player1,
        player2,
        round: 1,
        player1Choice: "",
        player2Choice: "",
      };
    },
    updateGameState(state, action) {
      state.gameState = { ...state.gameState, ...action.payload };
      localStorage.setItem("gameState", JSON.stringify(state.gameState));
    },
    updateScores(state, action) {
      const { username } = action.payload;
      const player = state.players.find((p) => p.username === username);
      if (player) player.score += 1;
      // Update leaderboard
      state.leaderboard = [...state.players].sort((a, b) => b.score - a.score);
      localStorage.setItem("leaderboard", JSON.stringify(state.leaderboard));
    },
    addToWaitingList(state, action) {
      state.waitingList.push(action.payload);
    },
    removeFromWaitingList(state, action) {
      state.waitingList = state.waitingList.filter(
        (p) => p.username !== action.payload.username
      );
    },
    endGame(state, action) {
      // Clear game state
      state.gameState = null;
      // state.leaderboard = [...state.players].sort((a, b) => b.score - a.score);
      // localStorage.setItem("leaderboard", JSON.stringify(state.leaderboard));
    },
    syncStateFromStorage(state, action) {
      return { ...state, ...action.payload };
    },
    resetState() {
      // Clear relevant localStorage items
      localStorage.removeItem("players");
      localStorage.removeItem("leaderboard");
      localStorage.removeItem("gameState");

      //reset current player
      window.name = "";

      // Reset the state to the initial state
      return {
        players: [],
        leaderboard: [],
        gameState: null,
        currentPlayer: { username: "" },
      };
    },
  },
});

export const {
  joinGame,
  startGame,
  updateScores,
  addToWaitingList,
  removeFromWaitingList,
  syncStateFromStorage,
  setCurrentPlayer,
  endGame,
  updateGameState,
  resetState,
} = gameSlice.actions;

export default gameSlice.reducer;
