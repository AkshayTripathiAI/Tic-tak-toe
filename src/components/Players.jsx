import { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  // When the new state depends on the previous state, pass a function to
  // the state updater: React calls it with the guaranteed latest value.
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Fall back to the default name instead of saving an empty one.
    const name = playerName.trim() || initialName;
    setPlayerName(name);
    onChangeName(symbol, name);
    setIsEditing(false);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <form className="player-form" onSubmit={handleSubmit}>
        <span className="player highlight-player">
          {isEditing ? (
            <input
              type="text"
              aria-label={`Name for player ${symbol}`}
              value={playerName}
              onChange={handleChange}
              maxLength={20}
              autoFocus
            />
          ) : (
            <span className="player-name">{playerName}</span>
          )}
          <span className="player-symbol">{symbol}</span>
        </span>
        {isEditing ? (
          <button type="submit">Save</button>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </form>
    </li>
  );
}

export default Player;
