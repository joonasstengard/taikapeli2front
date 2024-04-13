import BattleMapTile from "./BattleMapTile";

import type Warrior from "../../types/Warrior";

interface Props {
  // handleSelectedWarriorChange: (selectedWarrior: Warrior) => void;
  handlePlayerMoveWarrior: (tileId: string) => void;
  playersWarriors: Warrior[];
  computersWarriors: Warrior[];
  isSelectingMovingLocation: boolean;
  warriorWhoseTurnItIsToMove: Warrior;
}

export default function BattleMap({
  // handleSelectedWarriorChange,
  handlePlayerMoveWarrior,
  isSelectingMovingLocation,
  playersWarriors,
  computersWarriors,
  warriorWhoseTurnItIsToMove,
}: Props) {
  const battleMapWidth = 6;
  const battleMapHeight = 8;

  const renderTiles = () => {
    // Combine both armies for easy searching
    const allWarriors = [...playersWarriors, ...computersWarriors];
    const tiles = [];
    for (let row = 0; row < battleMapHeight; row++) {
      for (let col = 0; col < battleMapWidth; col++) {
        const id = String.fromCharCode(65 + col) + (row + 1);
        const warriorOnTile = allWarriors.find(
          (warrior) =>
            warrior.battleTileCurrent.toLowerCase() === id.toLowerCase()
        );
        tiles.push(
          <BattleMapTile
            key={id}
            battleMapHeight={battleMapHeight}
            battleMapWidth={battleMapWidth}
            // handleSelectedWarriorChange={handleSelectedWarriorChange}
            handlePlayerMoveWarrior={handlePlayerMoveWarrior}
            isSelectingMovingLocation={isSelectingMovingLocation}
            tileId={id}
            warrior={warriorOnTile}
            warriorWhoseTurnItIsToMove={warriorWhoseTurnItIsToMove}
          />
        );
      }
    }
    return tiles;
  };

  return (
    <div className="battle-map">
      <div
        className="battle-map-tile-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${battleMapWidth}, 1fr)`,
        }}
      >
        {renderTiles()}
      </div>
      <style jsx>{`
        .battle-map {
          background-color: white;
        }
      `}</style>
    </div>
  );
}
