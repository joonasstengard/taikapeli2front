import BattleMapTile from './BattleMapTile';

export default function BattleMap() {
    const battleMapWidth = 6;
    const battleMapHeight = 8;

    const renderTiles = () => {
        const tiles = [];
        for (let row = 0; row < battleMapHeight; row++) {
            for (let col = 0; col < battleMapWidth; col++) {
                // Generate a unique id like A1, A2, B1, B2, etc.
                const id = String.fromCharCode(65 + col) + (row + 1);
                tiles.push(<BattleMapTile key={id} tileId={id} />);
            }
        }
        return tiles;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${battleMapWidth}, 1fr)` }}>
            {renderTiles()}
        </div>
    );
}
