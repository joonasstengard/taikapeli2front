import Image from 'next/image';
import type Warrior from '../../types/Warrior';

interface Props {
    activeWarrior: Warrior;
}

export default function BattleActionBar({activeWarrior }: Props) {

    const activeWarriorImagePath = `/WarriorPictures/PixelStyle/${activeWarrior?.class}${activeWarrior?.gender}${activeWarrior?.picture}.webp`;

    if (!activeWarrior) {
        return (
            null
        )
    }

    return (
        <div className="battle-action-bar">
            <p className="warrior-title-text"><b>{activeWarrior?.name}</b>, {activeWarrior?.class}</p>
            <div className="image-and-stats">
                <div className="selected-warrior-image">
                    {activeWarrior && <Image src={activeWarriorImagePath} alt={activeWarrior?.name} height={85} width={85} />}
                </div>

                <div className="left-grid">
                    <p>Health: {activeWarrior?.health}/{activeWarrior?.health}</p>
                    <p>Mana: {activeWarrior?.mana}/{activeWarrior?.mana}</p>
                    <p>Stamina: {activeWarrior?.stamina}/{activeWarrior?.stamina}</p>
                </div>

                <div className="center-grid">
                    <p>Strength: {activeWarrior?.strength}</p>
                    <p>Speed: {activeWarrior?.speed}</p>
                    <p>Faith: {activeWarrior?.faith}</p>
                </div>

                <div className="right-grid">
                    <p>MR: {activeWarrior?.magicResistance}</p>
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
