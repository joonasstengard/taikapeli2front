import Image from "next/image";
import type Warrior from "../../types/Warrior";

interface Props {
    battleMapHeight: number;
    handleSelectedWarriorChange: (selectedWarrior: Warrior) => void;
    tileId: string;
    warrior?: Warrior;
}

export default function BattleMapTile({ battleMapHeight, handleSelectedWarriorChange, tileId, warrior }: Props) {

    const handleClick = () => {
        if (warrior) {
            handleSelectedWarriorChange(warrior);
        } else {
            handleSelectedWarriorChange(null);
        }
    };

    // Extract the number from tileId
    const tileNumber = parseInt(tileId.slice(1));
    let texturePath;
    if (tileNumber === 1 || tileNumber === battleMapHeight) {
        texturePath = `/textures/greengrassstone${1}.webp`;
    } else if (tileNumber === 2 || tileNumber === (battleMapHeight - 1)) {
        const randomTileSubNumber = Math.floor(Math.random() * 3) + 1;
        texturePath = `/textures/greengrassstone${randomTileSubNumber}.webp`;
    } else {
        const randomTileSubNumber = Math.floor(Math.random() * 7) + 1;
        texturePath = `/textures/greengrass${randomTileSubNumber}.webp`;
    }

    return (
        <div className="tile" onClick={handleClick}>
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
            {/*<div className="tile-id">{tileId}</div>*/}
            <style jsx>{`
                .tile {
                    position: relative;
                    width: 70px;
                    height: 70px;
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