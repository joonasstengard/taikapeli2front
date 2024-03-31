import BattleMapTile from './BattleMapTile';

import type Warrior from '../../types/Warrior';

interface Props {
    handleSelectedWarriorChange: (selectedWarrior: Warrior) => void;
    topArmyWarriors: Warrior[];
    bottomArmyWarriors: Warrior[];
}

export default function BattleMap({ handleSelectedWarriorChange, topArmyWarriors, bottomArmyWarriors }: Props) {
    const battleMapWidth = 6;
    const battleMapHeight = 8;

    const renderTiles = () => {
        // Combine both armies for easy searching
        const allWarriors = [...topArmyWarriors, ...bottomArmyWarriors];
        const tiles = [];
        for (let row = 0; row < battleMapHeight; row++) {
            for (let col = 0; col < battleMapWidth; col++) {
                const id = String.fromCharCode(65 + col) + (row + 1);
                const warriorOnTile = allWarriors.find(warrior => warrior.battleTileCurrent === id);
                tiles.push(
                    <BattleMapTile
                        battleMapHeight={battleMapHeight}
                        handleSelectedWarriorChange={handleSelectedWarriorChange}
                        tileId={id}
                        warrior={warriorOnTile}
                    />
                );
            }
        }
        return tiles;
    };

    return (
        <div className="battle-map">
            <div className="battle-map-tile-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${battleMapWidth}, 1fr)` }}>
                {renderTiles()}
            </div>
            <style jsx>{`
            .battle-map {
                background-color:white;
            }
             `}</style>
        </div>
    );
}
