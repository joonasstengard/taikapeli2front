interface Props {
  handleIsSelectingMovingLocation: (isSelectingMovingLocation: boolean) => void;
  handlePlayerWait: () => void;
  isSelectingMovingLocation: boolean;
}

export default function BattleActionButtons({
  handleIsSelectingMovingLocation,
  handlePlayerWait,
  isSelectingMovingLocation,
}: Props) {
  const moveButtonText = isSelectingMovingLocation ? "Cancel" : "Move";

  const handleMoveButtonClick = () => {
    if (!isSelectingMovingLocation) {
      handleIsSelectingMovingLocation(true);
    } else {
      handleIsSelectingMovingLocation(false);
    }
  };

  return (
    <div className="action-buttons">
      <button className="action-buttons-button" onClick={handleMoveButtonClick}>
        {moveButtonText}
      </button>
      <button className="action-buttons-button">Attack</button>
      <button className="action-buttons-button">Spells</button>
      <button className="action-buttons-button">Skills</button>
      <button className="action-buttons-button" onClick={handlePlayerWait}>
        Wait
      </button>
      <style jsx>{`
        .action-buttons {
        }
        .action-buttons-button {
          margin-left: 0px;
          margin-right: 2px;
        }
      `}</style>
    </div>
  );
}
