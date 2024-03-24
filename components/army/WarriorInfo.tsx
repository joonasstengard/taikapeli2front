import Image from 'next/image';
import Warrior from '../../types/Warrior';

interface WarriorInfoProps {
    warrior: Warrior;
}

export default function WarriorInfo({ warrior }: WarriorInfoProps) {

    // Construct the image file path
    const imagePath = `/WarriorPictures/${warrior.class}${warrior.picture}.png`;

    return (
        <div className="warrior-info">
            <Image className="warrior-image" src={imagePath} alt={warrior.name} width={30} height={30} />
            <p><b>{warrior.name}</b></p>
            <p>{warrior.class}</p>
            <p>Health: {warrior.health}</p>
            <p>Mana: {warrior.mana}</p>
            <style jsx>{`
            .warrior-image{}
            .warrior-info{
                margin-top:20px;
                padding: 30px;background: #171717;
                transition: 1s ease-in-out;
                clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
                border-top-right-radius: 20px;
                border-bottom-left-radius: 20px;
                display: flex;
                flex-direction: column;
            }
             `}</style>
        </div>
    );
}
