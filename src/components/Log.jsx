export default function Log({ turns, players }) {
  return (
    <ol id="log" aria-label="Move log">
      {turns.map((turn, index) => (
        <li
          key={`${turn.square.row}${turn.square.col}`}
          className={index === 0 ? "highlighted" : undefined}
        >
          {players[turn.player]} ({turn.player}) selected row{" "}
          {turn.square.row + 1}, column {turn.square.col + 1}
        </li>
      ))}
    </ol>
  );
}
