"use client"

import React, { useState, useEffect } from 'react';
import WarriorInfo from './WarriorInfo';

export default function ArmyView() {
    const [warriors, setWarriors] = useState([]);

    useEffect(() => {
        // Replace these with actual userId and armyId
        const userId = 1; // Example user ID
        const armyId = 1; // Example army ID

        fetch(`http://localhost:3001/game/army/${userId}/${armyId}`)
            .then(response => response.json())
            .then(data => setWarriors(data))
            .catch(error => console.error('Error:', error));
    }, []); // Empty dependency array to fetch only once on mount

    return (
        <div className="army-area">
            <h2>Army</h2>
            {warriors.map(warrior => (
                <WarriorInfo key={warrior.id} warrior={warrior} />
            ))}
            <style jsx>{`
            .army-area{
                padding-left: 70px;
                padding-right: 70px;
                padding-top: 20px;
                padding-bottom: 30px;
                clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
                background-color: #212121;
                border-radius: 1rem;
                border: black 0.2rem solid;
                box-shadow: 0.4rem 0.4rem 0.6rem #00000040;
            }
             `}</style>
        </div>
    );
}
