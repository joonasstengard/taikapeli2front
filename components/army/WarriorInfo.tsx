import Image from 'next/image';
import Warrior from '../../types/Warrior';

interface WarriorInfoProps {
    warrior: Warrior;
}

export default function WarriorInfo({ warrior }: WarriorInfoProps) {
    const imagePath = `/WarriorPictures/${warrior.class}${warrior.gender}${warrior.picture}.webp`;

    return (
        <div className="warrior-info">
            <Image className="warrior-image" src={imagePath} alt={warrior.name} width={80} height={50} />

            <div className="warrior-property"><span className="left"><b>{warrior.name}</b></span></div>
            <div className="warrior-property"><span className="left">{warrior.class}</span></div>
            <div className="warrior-property"><span className="left">Health</span><span className="right">{warrior.health}</span></div>
            <div className="warrior-property"><span className="left">Mana</span><span className="right">{warrior.mana}</span></div>
            <div className="warrior-property"><span className="left">Stamina</span><span className="right">{warrior.stamina}</span></div>
            <div className="warrior-property"><span className="left">Strength</span><span className="right">{warrior.strength}</span></div>
            <div className="warrior-property"><span className="left">Speed</span><span className="right">{warrior.speed}</span></div>
            <div className="warrior-property"><span className="left">Faith</span><span className="right">{warrior.faith}</span></div>
            <div className="warrior-property"><span className="left">MR</span><span className="right">{warrior.magicResistance}</span></div>

            <style jsx>{`
                .warrior-info{
                    margin-top: 20px;
                    padding: 30px;
                    background: #171717;
                    transition: 1s ease-in-out;
                    clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
                    border-top-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    min-width: 220px;
                }
                .warrior-property {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }
                .left {
                    text-align: left;
                }
                .right {
                    text-align: right;
                    margin-left: auto;
                }
            `}</style>
        </div>
    );
}
