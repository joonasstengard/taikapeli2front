import Image from 'next/image';
import type Warrior from '../../types/Warrior';

interface Props {
    selectedWarrior: Warrior;
}

export default function BattleActionBar({ selectedWarrior }: Props) {

    const selectedWarriorImagePath = `/WarriorPictures/PixelStyle/${selectedWarrior?.class}${selectedWarrior?.gender}${selectedWarrior?.picture}.webp`;

    if (!selectedWarrior) {
        return (
            null
        )
    }

    return (
        <div className="battle-action-bar">
            <p className="warrior-title-text"><b>{selectedWarrior?.name}</b>, {selectedWarrior?.class}</p>
            <div className="image-and-stats">
                <div className="selected-warrior-image">
                    {selectedWarrior && <Image src={selectedWarriorImagePath} alt={selectedWarrior?.name} height={85} width={85} />}
                </div>

                <div className="left-grid">
                    <p>Health: {selectedWarrior?.health}/{selectedWarrior?.health}</p>
                    <p>Mana: {selectedWarrior?.mana}/{selectedWarrior?.mana}</p>
                    <p>Stamina: {selectedWarrior?.stamina}/{selectedWarrior?.stamina}</p>
                </div>

                <div className="center-grid">
                    <p>Strength: {selectedWarrior?.strength}</p>
                    <p>Speed: {selectedWarrior?.speed}</p>
                    <p>Faith: {selectedWarrior?.faith}</p>
                </div>

                <div className="right-grid">
                    <p>MR: {selectedWarrior?.magicResistance}</p>
                </div>
                <div>
                    <button>asd</button>
                </div>
            </div>

            <style jsx>{`
            .battle-action-bar {
                background-color:#3b3b3b;
                color: white;
                padding: 2px;
            }
            .image-and-stats {
                display: flex;
                background-color:#212121;
                color: white;
                align-items: center;
                font-size: 13px;
            }
            .selected-warrior-image {
                background-color:white;
                max-width: 85px;
                margin-right: 20px; /* Adjust spacing as needed */
            }
            .left-grid, .center-grid, .right-grid {
                display: flex;
                flex-direction: column;
                margin-right: 20px; /* Adjust spacing between grids */
            }
            .warrior-title-text {
                font-size: 14px;
                padding: 2px;
            }
            `}</style>
        </div>
    );
}
