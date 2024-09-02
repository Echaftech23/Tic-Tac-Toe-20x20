# Tic Tac Toe 20x20

## Table of Contents
1. [Project Context](#project-context)
2. [Game Overview](#game-overview)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Game Rules](#game-rules)
6. [Installation](#installation)
7. [How to Play](#how-to-play)
8. [Game Interface](#game-interface)
9. [Game Mechanics](#game-mechanics)
10. [Additional Functions](#additional-functions)
11. [Design and Responsiveness](#design-and-responsiveness)
12. [Code Structure](#code-structure)
13. [Future Enhancements](#future-enhancements)
14. [Contributing](#contributing)
15. [License](#license)

## Project Context

MediaGame, an online gaming start-up, aims to enhance user experience by introducing new games. As part of this initiative, they have developed a 20x20 Tic Tac Toe game.

## Game Overview

This project implements a two-player Tic Tac Toe game on a 20x20 grid using HTML, CSS, and JavaScript. The game utilizes DOM manipulation and local storage for data persistence.

## Features

- 20x20 game board
- Two-player gameplay
- Symbol selection for players
- Score tracking
- Responsive design for various devices
- New game option without page refresh

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API

## Game Rules

1. The game is played on a 20x20 grid.
2. Two players take turns marking empty cells with their chosen symbols (typically X and O).
3. Player 1 starts the game.
4. The goal is to form a straight line of 5 consecutive symbols (horizontally, vertically, or diagonally).
5. The first player to achieve this wins the game.
6. If all cells are filled and no player has won, the game is a draw.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tic-tac-toe-20x20.git
   ```
2. Navigate to the project directory:
   ```
   cd tic-tac-toe-20x20
   ```
3. Open the `index.html` file in your preferred web browser.

## How to Play

1. Open the game in your web browser.
2. On the initial screen, each player selects their preferred symbol.
3. After symbol selection, players are redirected to the game page.
4. Players take turns clicking on empty cells to place their symbols.
5. The game ends when a player forms a line of 5 symbols or the board is full.

## Game Interface

- The game displays a 20x20 grid representing the game board.
- Each player's chosen symbol and current score are shown.
- A message area indicates whose turn it is and announces the game result.
- A "New Game" button is available to start a fresh game.

## Game Mechanics

- The game alternates turns between players.
- Clicking on an occupied cell is not allowed.
- The game checks for a win condition after each move.
- If a win is detected, the game ends and the winner is announced.
- If all cells are filled without a winner, the game declares a draw.

## Additional Functions

- **Symbol Selection**: Players can choose their preferred symbols before the game starts.
- **Score Tracking**: The game keeps track of each player's wins across multiple games.
- **New Game**: Players can start a new game without refreshing the page.

## Design and Responsiveness

- The game interface is designed to be visually appealing and user-friendly.
- The layout is responsive and adapts to various screen sizes, including mobile devices and desktop computers.

## Code Structure

The JavaScript code is organized into several key functions, each responsible for a specific aspect of the game:

1. `loadPlayerSymbols()`: 
   - Retrieves the player symbols from local storage or prompts players to choose their symbols.
   - Ensures each player has a unique symbol before starting the game.

2. `createBoard()`: 
   - Dynamically generates the 20x20 game board.
   - Sets up event listeners for each cell on the board.

3. `handleCellClick(event)`: 
   - Manages the logic when a player clicks on a cell.
   - Updates the game state and checks for win/draw conditions.
   - Switches turns between players.

4. `checkWin(row, col, symbol)`: 
   - Checks if the current move results in a win.
   - Verifies horizontal, vertical, and diagonal lines for 5 consecutive symbols.

5. `checkDraw()`: 
   - Determines if the game has ended in a draw (all cells filled with no winner).

6. `resetBoard()`: 
   - Clears the game board for a new game.
   - Resets any game state variables to their initial values.

7. `updateCurrentPlayer()`: 
   - Switches the active player after each move.
   - Updates the UI to indicate whose turn it is.

8. `updateScore(winner)`: 
   - Increments the score for the winning player.
   - Updates the score display in the UI.

9. `saveScore()`: 
   - Saves the current game scores to local storage.
   - Ensures persistence of scores across page reloads.

10. `loadScore()`: 
    - Retrieves saved scores from local storage.
    - Initializes the score display when the game loads.

These functions work together to create a smooth and interactive gaming experience. The modular structure allows for easy maintenance and potential future enhancements.

## Future Enhancements

- Implement an AI opponent for single-player mode.
- Add online multiplayer functionality.
- Introduce different board sizes as game options.

## Contributing

Contributions to improve the game are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.