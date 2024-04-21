import Image from "next/image";
import type Warrior from "../../types/Warrior";

interface Props {
  battleMapHeight: number;
  battleMapWidth: number;
  // handleSelectedWarriorChange: (selectedWarrior: Warrior) => void;
  handlePlayerAttack: (tileId: string) => void;
  handlePlayerMoveWarrior: (tileId: string) => void;
  isSelectingAttackingTarget: boolean;
  isSelectingMovingLocation: boolean;
  tileId: string;
  warrior?: Warrior;
  warriorWhoseTurnItIsToMove: Warrior;
}

export default function BattleMapTile({
  battleMapHeight,
  battleMapWidth,
  // handleSelectedWarriorChange,
  handlePlayerAttack,
  handlePlayerMoveWarrior,
  isSelectingAttackingTarget,
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
    const maxDistanceForAttacking = warriorWhoseTurnItIsToMove?.attackRange;
    const maxDistanceForMoving = getMovementRange(
      warriorWhoseTurnItIsToMove?.currentStamina
    );
    // attacking
    if (
      isSelectingAttackingTarget &&
      warrior &&
      distance <= maxDistanceForAttacking
    ) {
      handlePlayerAttack(tileId);
    } else if (distance > maxDistanceForAttacking) {
      // alert the user here that they are trying to attack past the max range?
    }
    // moving
    if (
      isSelectingMovingLocation &&
      !warrior &&
      distance <= maxDistanceForMoving
    ) {
      handlePlayerMoveWarrior(tileId);
    } else if (distance > maxDistanceForMoving) {
      // alert the user here that they are trying to move past the max range?
    }
  };

  // Determine tile highlights
  let tileClass = "tile";
  if (isSelectingAttackingTarget) {
    // attacking------------
    const distance = calculateDistance(
      warriorWhoseTurnItIsToMove?.battleTileCurrent,
      tileId
    );
    const maxDistance = warriorWhoseTurnItIsToMove?.attackRange;

    // borders
    if (warrior) {
      if (warrior.id === warriorWhoseTurnItIsToMove.id) {
        // self tile
        tileClass = "tile turn";
      } else {
        // selecting this tile while there is another warrior in it
        if (distance <= maxDistance) {
          tileClass = "tile attacking-tile-with-warrior";
        } else {
          tileClass = "tile attacking-tile-too-far-away";
        }
      }
    } else {
      // trying to attack a tile with no warrior
      tileClass = "tile attacking-empty-tile";
    }
  } else if (isSelectingMovingLocation) {
    // moving-------------------
    const distance = calculateDistance(
      warriorWhoseTurnItIsToMove?.battleTileCurrent,
      tileId
    );
    const maxDistance = getMovementRange(
      warriorWhoseTurnItIsToMove?.currentStamina
    );

    // borders
    if (warrior) {
      if (warrior.id === warriorWhoseTurnItIsToMove.id) {
        // this tiles warriors turn to move
        tileClass = "tile turn";
      } else {
        // selecting this tile while there is another warrior in it
        tileClass = "tile moving-tile-with-warrior";
      }
    } else if (isSelectingMovingLocation) {
      // empty tile
      if (distance <= maxDistance) {
        tileClass = "tile moving-empty-tile";
      } else {
        tileClass = "tile moving-tile-too-far-away";
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
        <div>
          <div className="health-bar">
            <div
              className="health-bar-green"
              style={{
                width: `${(warrior.currentHealth / warrior.health) * 100}%`,
              }}
            ></div>
            <div
              className="health-bar-red"
              style={{
                width: `${
                  100 - (warrior.currentHealth / warrior.health) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="warrior-image">
            <Image
              src={
                warrior.currentHealth > 0
                  ? `/WarriorPictures/PixelStyle/${warrior.class}${warrior.gender}${warrior.picture}.webp`
                  : `/objects/gravestone.webp`
              }
              alt={"warrior"}
              width={70}
              height={70}
            />
          </div>
        </div>
      )}
      <div className="tile-id">{tileId}</div>
      <style jsx>{`
        .health-bar {
          position: absolute;
          top: 0px;
          left: 5px;
          width: 60px;
          height: 5px;
          display: flex;
        }
        .health-bar-green {
          height: 5px;
          background-color: green;
        }
        .health-bar-red {
          height: 5px;
          background-color: #991717;
        }
        .tile {
          position: relative;
          width: 70px;
          height: 70px;
        }
        .tile.attacking-empty-tile:hover {
          border: 2px solid black;
        }
        .tile.attacking-tile-too-far-away:hover {
          border: 2px solid red;
        }
        .tile.attacking-tile-with-warrior:hover {
          border: 2px solid green;
        }
        .tile.moving-empty-tile:hover {
          border: 2px solid green;
        }
        .tile.moving-tile-too-far-away:hover {
          border: 2px solid black;
        }
        .tile.moving-tile-with-warrior:hover {
          border: 2px solid red;
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
