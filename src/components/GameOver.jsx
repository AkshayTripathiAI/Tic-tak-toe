export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over" role="alert">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={onRestart} autoFocus>
          Rematch!
        </button>
      </p>
    </div>
  );
}
