import Image from 'next/image';

interface Props {
    tileId: string;
}

export default function BattleMapTile({ tileId }: Props) {

    const imagePath = `/textures/softTile40x40.png`;

    return (
        <div className="tile">
            <Image src={imagePath} alt={'tile'} width={40} height={40} />
            {tileId}
            <style jsx>{`
            .tile {
                padding: 1px;
            }
             `}</style>
        </div>
    )

}