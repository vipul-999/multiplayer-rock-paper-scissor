import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: JSON.parse(localStorage.getItem('players')) || [],
  leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || [],
  waitingList: JSON.parse(localStorage.getItem('waitingList')) || [],
  gameState: JSON.parse(localStorage.getItem('gameState')) || null,
  currentPlayer:{username:''}
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    joinGame(state, action) {
      const { username } = action.payload;
      state.players.push({ username, score: 0 });
      state.currentPlayer = { username, score: 0 };
        window.name=username
    },
    setCurrentPlayer(state,action){
        const { username } = action.payload;
        state.currentPlayer = { username, score: 0 };
        window.name=username
    },
    startGame(state, action) {
        const { player1, player2 } = action.payload;
        state.gameState = {
            player1,
            player2,
            round: 1,
            player1Choice: '',
            player2Choice: '',
          };
        // Optionally move players to a waiting list
        // state.players = state.players.filter(p => p.username !== player1.username && p.username !== player2.username);
      },  
    updateGameState(state, action) {
        state.gameState = { ...state.gameState, ...action.payload };
        localStorage.setItem('gameState', JSON.stringify(state.gameState));
      },
    updateScores(state, action) {
      const { username } = action.payload;
      const player = state.players.find(p => p.username === username);
      if (player) player.score += 1;
    },
    addToWaitingList(state, action) {
      state.waitingList.push(action.payload);
    },
    removeFromWaitingList(state, action) {
      state.waitingList = state.waitingList.filter(p => p.username !== action.payload.username);
    },
    endGame(state, action) {
        const { winner, loser } = action.payload;
        
        // Update scores
        // const winnerPlayer = state.players.find(p => p.username === winner);
        // if (winnerPlayer) winnerPlayer.score += 1;
  
        // Update leaderboard
        state.leaderboard = [...state.players].sort((a, b) => b.score - a.score);
        localStorage.setItem('leaderboard', JSON.stringify(state.leaderboard));
        
        // Clear game state
        state.gameState = null;
        
        // Optionally add winners and losers back to the player list
        // state.players.push(winnerPlayer);
        // if (loser) state.players.push(state.players.find(p => p.username === loser));
      },
    syncStateFromStorage(state, action) {
      return { ...state, ...action.payload };
    },
    resetState() {
        // Clear relevant localStorage items
      localStorage.removeItem('players');
      localStorage.removeItem('leaderboard');
      localStorage.removeItem('waitingList');
      localStorage.removeItem('gameState');

      //reset current player
      window.name='';

        // Reset the state to the initial state
        return initialState;
      }
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
  resetState
} = gameSlice.actions;

export default gameSlice.reducer;
