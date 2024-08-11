import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../reducers/gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  // Optionally add middleware here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yourCustomMiddleware),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

let previousState = store.getState();

store.subscribe(() => {
  const currentState = store.getState();
  // Only update localStorage if players, leaderboard, or gameState have changed
  if (
    JSON.stringify(previousState.game.players) !==
      JSON.stringify(currentState.game.players) ||
    JSON.stringify(previousState.game.leaderboard) !==
      JSON.stringify(currentState.game.leaderboard) ||
    JSON.stringify(previousState.game.gameState) !==
      JSON.stringify(currentState.game.gameState)
  ) {
    localStorage.setItem("players", JSON.stringify(currentState.game.players));
    localStorage.setItem(
      "leaderboard",
      JSON.stringify(currentState.game.leaderboard)
    );
    localStorage.setItem(
      "gameState",
      JSON.stringify(currentState.game.gameState)
    );
    previousState = currentState;
  }
});

export default store;
