import Image from "next/image";
import type Warrior from "../../types/Warrior";

interface Props {
  battleMapHeight: number;
  battleMapWidth: number;
  // handleSelectedWarriorChange: (selectedWarrior: Warrior) => void;
  handlePlayerMoveWarrior: (tileId: string) => void;
  isSelectingMovingLocation: boolean;
  tileId: string;
  warrior?: Warrior;
  warriorWhoseTurnItIsToMove: Warrior;
}

export default function BattleMapTile({
  battleMapHeight,
  battleMapWidth,
  // handleSelectedWarriorChange,
  handlePlayerMoveWarrior,
  isSelectingMovingLocation,
  tileId,
  warrior,
  warriorWhoseTurnItIsToMove,
}: Props) {
  // if battleMapWidth = 6, columns is = ["A", "B", "C", "D", "E", "F"] etc...
  const columns = Array.from({ length: battleMapWidth }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // calculates how far the current tile is from the target tile
  function calculateDistance(currentTile, targetTile) {
    const currentCol = columns.indexOf(currentTile[0]);
    const currentRow = parseInt(currentTile.slice(1), 10);
    const targetCol = columns.indexOf(targetTile[0]);
    const targetRow = parseInt(targetTile.slice(1), 10);
    return Math.max(
      Math.abs(targetCol - currentCol),
      Math.abs(targetRow - currentRow)
    );
  }

  function getMovementRange(stamina) {
    return Math.floor(stamina / 10) + 1;
  }

  const handleClick = () => {
    const distance = calculateDistance(
      warriorWhoseTurnItIsToMove?.battleTileCurrent,
      tileId
    );
    const maxDistance = getMovementRange(
      warriorWhoseTurnItIsToMove?.currentStamina
    );
    if (isSelectingMovingLocation && !warrior && distance <= maxDistance) {
      handlePlayerMoveWarrior(tileId);
    } else if (distance > maxDistance) {
      // alert the user here that they are trying to click past the max range?
    }
  };

  // Determine tile highlights
  let tileClass = "tile";
  if (isSelectingMovingLocation) {
    const distance = calculateDistance(
      warriorWhoseTurnItIsToMove?.battleTileCurrent,
      tileId
    );
    const maxDistance = getMovementRange(
      warriorWhoseTurnItIsToMove?.currentStamina
    );

    // borders
    if (warrior && warriorWhoseTurnItIsToMove) {
      if (warrior.id === warriorWhoseTurnItIsToMove.id) {
        // this tiles warriors turn to move
        tileClass = "tile turn";
      } else if (isSelectingMovingLocation) {
        // selecting this tile while there is another warrior in it
        tileClass = "tile selecting-tile-with-warrior";
      }
    } else if (isSelectingMovingLocation) {
      // empty tile
      if (distance <= maxDistance) {
        tileClass = "tile selecting-empty-tile";
      } else {
        tileClass = "tile selecting-tile-too-far-away";
      }
    }
  }

  // textures
  // Extract the number from tileId
  const tileNumber = parseInt(tileId.slice(1));
  let texturePath;
  if (tileNumber === 1 || tileNumber === battleMapHeight) {
    texturePath = `/textures/greengrassstone${1}.webp`;
  } else if (tileNumber === 2 || tileNumber === battleMapHeight - 1) {
    // const randomTileSubNumber = Math.floor(Math.random() * 3) + 1;
    // texturePath = `/textures/greengrassstone${randomTileSubNumber}.webp`;
    texturePath = `/textures/greengrassstone${3}.webp`;
  } else {
    // const randomTileSubNumber = Math.floor(Math.random() * 7) + 1;
    // texturePath = `/textures/greengrass${randomTileSubNumber}.webp`;
    texturePath = `/textures/greengrass${3}.webp`;
  }

  return (
    <div className={tileClass} onClick={handleClick}>
      <Image src={texturePath} alt={"tile"} width={70} height={70} />
      {warrior && (
        <div className="warrior-image">
          <Image
            src={`/WarriorPictures/PixelStyle/${warrior.class}${warrior.gender}${warrior.picture}.webp`}
            alt={"warrior"}
            width={70}
            height={70}
          />
        </div>
      )}
      <div className="tile-id">{tileId}</div>
      <style jsx>{`
        .tile {
          position: relative;
          width: 70px;
          height: 70px;
        }
        .tile.selecting-empty-tile:hover {
          border: 1px solid green;
        }
        .tile.selecting-tile-too-far-away:hover {
          border: 1px solid red;
        }
        .tile.selecting-tile-with-warrior:hover {
          border: 1px solid red;
        }
        .tile.turn {
          border: 2px solid yellow;
        }
        .warrior-image {
          position: absolute;
          top: 0;
          left: 0;
        }
        .tile-id {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 10px;
          color: white;
        }
      `}</style>
    </div>
  );
}
