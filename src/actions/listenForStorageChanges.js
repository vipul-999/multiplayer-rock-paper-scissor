import { syncStateFromStorage } from '../reducers/gameSlice';

export const listenForStorageChanges = () => {
  return (dispatch) => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'players' || event.key === 'leaderboard' || event.key === 'gameState') {
        const updatedState = {
          gameState: JSON.parse(localStorage.getItem('gameState')) || null,
          players: JSON.parse(localStorage.getItem('players')) || [],
          leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || [],
        };
        dispatch(syncStateFromStorage(updatedState));
      }
    });
  };
};
