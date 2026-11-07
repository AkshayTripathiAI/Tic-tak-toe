import { useEffect, useState } from "react";
import Player from "./components/Players";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import Scoreboard from "./components/Scoreboard";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const SCORE_KEY = "ticTacToe.scores";
const EMPTY_SCORES = { X: 0, O: 0, draws: 0 };

function readScores() {
  try {
    const stored = JSON.parse(localStorage.getItem(SCORE_KEY));
    return stored ? { ...EMPTY_SCORES, ...stored } : EMPTY_SCORES;
  } catch {
    return EMPTY_SCORES;
  }
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  // Deep copy so restarting really starts from an empty board (arrays are
  // references, so mutating INITIAL_GAME_BOARD would leak between games).
  const gameBoard = INITIAL_GAME_BOARD.map((array) => [...array]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

// Returns the winning symbol and line, or null.
function deriveWinner(gameBoard) {
  for (const combination of WINNING_COMBINATIONS) {
    const [first, second, third] = combination.map(
      ({ row, column }) => gameBoard[row][column],
    );
    if (first && first === second && first === third) {
      return { symbol: first, line: combination };
    }
  }
  return null;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const [scores, setScores] = useState(readScores);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winResult = deriveWinner(gameBoard);
  // Use the (possibly edited) player names, not the defaults.
  const winner = winResult ? players[winResult.symbol] : null;
  const hasDraw = gameTurns.length === 9 && !winResult;
  const gameIsOver = Boolean(winResult) || hasDraw;

  // Record the result once per finished game.
  const resultKey = winResult ? winResult.symbol : hasDraw ? "draws" : null;
  useEffect(() => {
    if (!resultKey) return;
    setScores((prevScores) => {
      const updated = { ...prevScores, [resultKey]: prevScores[resultKey] + 1 };
      try {
        localStorage.setItem(SCORE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  }, [resultKey]);

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameIsOver) return;
    setGameTurns((prevTurns) => {
      const curPlayer = deriveActivePlayer(prevTurns);
      return [
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prevTurns,
      ];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleUndo() {
    setGameTurns((prevTurns) => prevTurns.slice(1));
  }

  function handleResetScores() {
    setScores(EMPTY_SCORES);
    try {
      localStorage.removeItem(SCORE_KEY);
    } catch {
      // ignore storage errors
    }
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Each Player instance has its own isolated state. */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={!gameIsOver && activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={!gameIsOver && activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {gameIsOver && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          winningLine={winResult?.line}
          disabled={gameIsOver}
        />
        <p id="game-actions">
          <button
            type="button"
            onClick={handleUndo}
            disabled={gameTurns.length === 0 || gameIsOver}
          >
            Undo move
          </button>
          <button
            type="button"
            onClick={handleRestart}
            disabled={gameTurns.length === 0}
          >
            Restart
          </button>
        </p>
      </div>
      <Scoreboard
        players={players}
        scores={scores}
        onReset={handleResetScores}
      />
      <Log turns={gameTurns} players={players} />
      <footer id="footer">
        <a
          href="https://github.com/AkshayTripathiAI/Tic-tak-toe"
          target="_blank"
          rel="noreferrer"
        >
          View source on GitHub
        </a>
      </footer>
    </main>
  );
}

export default App;
