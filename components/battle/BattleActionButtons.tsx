interface Props {
  handleIsSelectingMovingLocation: (isSelectingMovingLocation: boolean) => void;
  isSelectingMovingLocation: boolean;
}

export default function BattleActionButtons({
  handleIsSelectingMovingLocation,
  isSelectingMovingLocation,
}: Props) {
  const moveButtonText = isSelectingMovingLocation ? "Cancel" : "Move";

  const handleMoveButtonClick = () => {
    if (!isSelectingMovingLocation) {
        handleIsSelectingMovingLocation(true);
    } else {
        handleIsSelectingMovingLocation(false);
    }
  }

  return (
    <div className="action-buttons">
      <button
        className="action-buttons-button"
        onClick={handleMoveButtonClick}
      >
        {moveButtonText}
      </button>
      <button className="action-buttons-button">Attack</button>
      <button className="action-buttons-button">Spell</button>
      <button className="action-buttons-button">Block</button>
      <style jsx>{`
        .action-buttons {
        }
        .action-buttons-button {
          margin-left: 0px;
          margin-right: 3px;
        }
      `}</style>
    </div>
  );
}
