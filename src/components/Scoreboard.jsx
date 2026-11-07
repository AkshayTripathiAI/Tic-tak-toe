export default function Scoreboard({ players, scores, onReset }) {
  const hasScores = scores.X + scores.O + scores.draws > 0;

  return (
    <section id="scoreboard" aria-label="Scoreboard">
      <p>
        <span className="score-label">{players.X} (X)</span>
        <span className="score-value">{scores.X}</span>
      </p>
      <p>
        <span className="score-label">Draws</span>
        <span className="score-value">{scores.draws}</span>
      </p>
      <p>
        <span className="score-label">{players.O} (O)</span>
        <span className="score-value">{scores.O}</span>
      </p>
      {hasScores && (
        <button type="button" onClick={onReset}>
          Reset scores
        </button>
      )}
    </section>
  );
}
