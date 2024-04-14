import type { SetStateAction, Dispatch } from "react";

interface Props {
  handlePlayerWait: () => void;
  isSelectingAttackingTarget: boolean;
  isSelectingMovingLocation: boolean;
  setIsSelectingAttackingTarget: Dispatch<SetStateAction<boolean>>;
  setIsSelectingMovingLocation: Dispatch<SetStateAction<boolean>>;
}

export default function BattleActionButtons({
  handlePlayerWait,
  isSelectingAttackingTarget,
  isSelectingMovingLocation,
  setIsSelectingAttackingTarget,
  setIsSelectingMovingLocation,
}: Props) {
  const attackButtonText = isSelectingAttackingTarget ? "Cancel" : "Attack";
  const moveButtonText = isSelectingMovingLocation ? "Cancel" : "Move";

  const handleMoveButtonClick = () => {
    // reset others first
    if (isSelectingAttackingTarget) {
      setIsSelectingAttackingTarget(false);
    }
    if (!isSelectingMovingLocation) {
      setIsSelectingMovingLocation(true);
    } else {
      setIsSelectingMovingLocation(false);
    }
  };

  const handleAttackButtonClick = () => {
    // reset others first
    if (isSelectingMovingLocation) {
      setIsSelectingMovingLocation(false);
    }
    if (!isSelectingAttackingTarget) {
      setIsSelectingAttackingTarget(true);
    } else {
      setIsSelectingAttackingTarget(false);
    }
  };

  return (
    <div className="action-buttons">
      <button className="action-buttons-button" onClick={handleMoveButtonClick}>
        {moveButtonText}
      </button>
      <button
        className="action-buttons-button"
        onClick={handleAttackButtonClick}
      >
        {attackButtonText}
      </button>
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
