# Tic-Tac-Toe

A two-player Tic-Tac-Toe game for the browser, built with React and Vite.

Built as a practice project while learning React.

![Tic-Tac-Toe game board](screenshots/tic-tac-toe.png)

## Features

- Two players (X and O) take turns on a 3x3 board; X always starts.
- The active player is highlighted, and each square can only be played once.
- Editable player names.
- Turn log listing every move made so far.
- Win and draw detection with a "Game Over" screen and a Rematch button.

| Game board | Game over |
| --- | --- |
| ![Game board](screenshots/gameboard.png) | ![Game over screen](screenshots/gameover.png) |

## Tech stack

- React 18 (function components, `useState`, derived state)
- Vite 4
- Plain CSS

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
git clone https://github.com/AkshayTripathiAI/Tic-tak-toe.git
cd Tic-tak-toe
npm install
npm run dev
```

Then open http://localhost:5173.

Other scripts:

| Command | Description |
| --- | --- |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── App.jsx                  # Game state: turns, board, winner/draw derivation
├── index.jsx                # Entry point
├── index.css
├── winning-combinations.js  # The 8 winning lines
└── components/
    ├── Players.jsx          # Player name display/edit
    ├── GameBoard.jsx        # 3x3 board
    ├── Log.jsx              # Turn log
    └── GameOver.jsx         # Winner/draw overlay with Rematch
```

## License

[MIT](LICENSE)
