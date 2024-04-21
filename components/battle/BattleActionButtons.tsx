import type { SetStateAction, Dispatch } from "react";
import type Spell from "../../types/Spell";

interface Props {
  handlePlayerWait: () => void;
  isSelectingAttackingTarget: boolean;
  isSelectingMovingLocation: boolean;
  setBattleActionBarDisplayWhat: Dispatch<
    SetStateAction<"warriorStats" | "warriorSpells" | "warriorSkills">
  >;
  setIsSelectingAttackingTarget: Dispatch<SetStateAction<boolean>>;
  setIsSelectingMovingLocation: Dispatch<SetStateAction<boolean>>;
  setIsSelectingSpellTargetForSpell: Dispatch<SetStateAction<Spell | null>>;
}

export default function BattleActionButtons({
  handlePlayerWait,
  isSelectingAttackingTarget,
  isSelectingMovingLocation,
  setBattleActionBarDisplayWhat,
  setIsSelectingAttackingTarget,
  setIsSelectingMovingLocation,
  setIsSelectingSpellTargetForSpell,
}: Props) {
  const attackButtonText = isSelectingAttackingTarget ? "Cancel" : "Attack";
  const moveButtonText = isSelectingMovingLocation ? "Cancel" : "Move";

  const handleAttackButtonClick = () => {
    // reset others first
    setIsSelectingMovingLocation(false);
    setIsSelectingSpellTargetForSpell(null);
    // reset BattleActionBar display to stats
    setBattleActionBarDisplayWhat("warriorStats");

    if (!isSelectingAttackingTarget) {
      setIsSelectingAttackingTarget(true);
    } else {
      setIsSelectingAttackingTarget(false);
    }
  };

  const handleMoveButtonClick = () => {
    // reset others first
    setIsSelectingAttackingTarget(false);
    setIsSelectingSpellTargetForSpell(null);

    // reset BattleActionBar display to stats
    setBattleActionBarDisplayWhat("warriorStats");

    if (!isSelectingMovingLocation) {
      setIsSelectingMovingLocation(true);
    } else {
      setIsSelectingMovingLocation(false);
    }
  };

  const handleSpellsButtonClick = () => {
    // reset others first
    if (isSelectingAttackingTarget) {
      setIsSelectingAttackingTarget(false);
    }
    if (isSelectingMovingLocation) {
      setIsSelectingMovingLocation(false);
    }
    // set BattleActionBar display to spells to see spell list
    setBattleActionBarDisplayWhat("warriorSpells");
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
      <button
        className="action-buttons-button"
        onClick={handleSpellsButtonClick}
      >
        Spells
      </button>
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
