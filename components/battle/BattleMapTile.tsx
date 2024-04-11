import Image from "next/image";
import type Warrior from "../../types/Warrior";

interface Props {
  battleMapHeight: number;
  // handleSelectedWarriorChange: (selectedWarrior: Warrior) => void;
  handleMoveCommandWarriorToTile: (tileId: string) => void;
  isSelectingMovingLocation: boolean;
  tileId: string;
  warrior?: Warrior;
  warriorWhoseTurnItIsToMove: Warrior;
}

export default function BattleMapTile({
  battleMapHeight,
  // handleSelectedWarriorChange,
  handleMoveCommandWarriorToTile,
  isSelectingMovingLocation,
  tileId,
  warrior,
  warriorWhoseTurnItIsToMove,
}: Props) {
  const handleClick = () => {
    if (isSelectingMovingLocation && !warrior) {
        handleMoveCommandWarriorToTile(tileId);
    }
  };

  // Determine tile highlights
  let tileClass = "tile";
  if (warrior && warriorWhoseTurnItIsToMove){
    if (warrior.id === warriorWhoseTurnItIsToMove.id){
        // this tiles warriors turn to move
        tileClass = "tile turn";
    } else if (isSelectingMovingLocation){
        // selecting this tile while there is another warrior in it
        tileClass = "tile selecting-tile-with-warrior"
    }
  } else if (isSelectingMovingLocation){
    tileClass = "tile selecting-empty-tile";
  }

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
          border: 1px solid yellow;
        }
        .tile.selecting-tile-with-warrior:hover {
            border: 1px solid red;
          }
        .tile.turn {
            border: 2px solid green;
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
