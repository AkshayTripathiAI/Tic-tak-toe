export default function GameBoard({
  onSelectSquare,
  board,
  winningLine,
  disabled,
}) {
  function isWinningSquare(rowIndex, colIndex) {
    return winningLine?.some(
      ({ row, column }) => row === rowIndex && column === colIndex,
    );
  }

  return (
    <ol id="game-board" aria-label="Game board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  // a square can only be played once
                  disabled={disabled || playerSymbol !== null}
                  className={
                    isWinningSquare(rowIndex, colIndex) ? "winning" : undefined
                  }
                  aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${
                    playerSymbol ?? "empty"
                  }`}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
