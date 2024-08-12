# Rock-Paper-Scissors Multiplayer App
https://vipul-999.github.io/multiplayer-rock-paper-scissor/

## Overview

The Rock-Paper-Scissors Multiplayer App is a real-time web application that allows multiple players to engage in the classic game of Rock-Paper-Scissors. The app is built using React and Redux for state management, and it supports multiplayer functionality with a leaderboard, player waitlist, and real-time game updates.

Note: Need atleast 2 players to start the game.

## Features

- **Multiplayer Support:** Multiple players can join the game, challenge each other, and play Rock-Paper-Scissors in real-time.
- **Lobby & Waitlist:** Players can join a lobby and wait for other players to start a game. Players already in a game will see others in the waitlist.
- **Leaderboard:** The app tracks scores and displays a leaderboard of players based on their win count.
- **Real-Time Gameplay:** The app updates in real-time, showing the choices of players and the game result after each round.
- **Reset Functionality:** The app includes a reset button that resets the game state, allowing players to start fresh.

## Tech Stack

- **Frontend:** React, Redux
- **Styles:** CSS (with custom animations and responsive design)

## Screenshots
<img width="1196" alt="Screenshot 2024-08-12 at 5 35 27 AM" src="https://github.com/user-attachments/assets/c5f9e3bc-7db9-4e10-bf2a-0c91e4af81c8">
<img width="1191" alt="Screenshot 2024-08-12 at 5 35 13 AM" src="https://github.com/user-attachments/assets/b972f7b8-eae1-4411-9fd6-0bca47d5bebd">
<img width="1195" alt="Screenshot 2024-08-12 at 5 34 54 AM" src="https://github.com/user-attachments/assets/bf443a7e-3a66-4a52-9d6f-4cf45e8b9e8b">
<img width="1200" alt="Screenshot 2024-08-12 at 5 34 16 AM" src="https://github.com/user-attachments/assets/b2b58870-5993-450b-8752-94a17ed0a0b4">


## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v12+)
- **npm** (v6+)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the Repository

```bash
git clone https://github.com/vipul-999/multiplayer-rock-paper-scissor.git
cd multiplayer-rock-paper-scissor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Running the Application
To start the development server, use the following command:

```bash
npm start
```
This will start the app in development mode. Open http://localhost:3000 in your browser to view it.

The page will reload automatically if you make edits to the code. You will also see any lint errors in the console.

## Project Structure

- /src: Contains all the source code for the app.
    - /actions: Redux actions for handling various game-related tasks.
    - /compo nents: Reusable UI components such as Game, PlayerCard, Leaderboard, etc.
    - /reducers: Redux reducers for managing the state of the app.
    - /styles: CSS files for styling the components.
    - /assets: Images and other static assets used in the app.
- /public: Public directory containing the HTML file and other static resources.

## Usage

1. **Join the Game**: Enter your username and join the lobby.
2. **Challenge a Player**: Select a player from the waitlist and start a game.
3. **Make Your Choice**: Choose between Rock, Paper, or Scissors.
4. **View the Result**: See the game result and challenge the same or another player again.
5. **Track Your Score**: View the leaderboard to see your rank among other players.
6. **Reset the Game**: Use the reset button to clear the game state and start fresh.

## Error Handling

The app includes error handling to manage issues like network errors, game state inconsistencies, and input validation. If any error occurs, an appropriate message will be displayed to the user.

## Responsive Design

The app is fully responsive, ensuring a seamless experience on both desktop and mobile devices. The UI adjusts dynamically to provide the best possible layout depending on the screen size.

## Future Enhancements

- **Persistent State:** Save the state of the game and leaderboard in a database so that the app can retain information across sessions.
- **Chat Feature:** Add a chat functionality for players to communicate while playing.
- **Enhanced Animations:** Add more interactive and engaging animations for a better user experience.



