'use client'

import React, { useState, useEffect } from 'react';
import BattleActionBar from './BattleActionBar';
import BattleMap from './BattleMap';

import type Battle from '../../types/Battle';
import type Warrior from '../../types/Warrior';

export default function Battle() {
    const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);
    const [battle, setBattle] = useState<Battle | null>(null);
    const [topArmyWarriors, setTopArmyWarriors] = useState<Warrior[]>([]);
    const [bottomArmyWarriors, setBottomArmyWarriors] = useState<Warrior[]>([]);

    useEffect(() => {
        const userId = 1; // Example user ID

        fetch(`http://localhost:3001/game/battle/getuserscurrentbattle/${userId}`)
            .then(response => response.json())
            .then(data => {
                setBattle(data[0]);
                return data[0];
            })
            .then(battle => {
                if (battle) {
                    fetchWarriors(userId, battle.topArmyId, setTopArmyWarriors);
                    fetchWarriors(userId, battle.bottomArmyId, setBottomArmyWarriors);
                }
            })
            .catch(error => console.error('Error fetching users current battle:', error));
    }, []); // Empty dependency array to fetch only once on mount

    const fetchWarriors = (userId, armyId, setWarriors) => {
        fetch(`http://localhost:3001/game/warriors/${userId}/${armyId}`)
            .then(response => response.json())
            .then(warriors => setWarriors(warriors))
            .catch(error => console.error(`Error fetching warriors for armyId ${armyId}:`, error));
    };

    const handleSelectedWarriorChange = (asd: Warrior) => {
        console.log('selected warrior changed to: ' + asd?.name);
        setSelectedWarrior(asd);
    }

    return (
        <div>
            <p>-battle-</p>
            <h2>round: {battle?.round}</h2>
            <p>Warriorname's turn to move</p>
            <BattleActionBar
                selectedWarrior={selectedWarrior}
            />
            <BattleMap
                topArmyWarriors={topArmyWarriors}
                bottomArmyWarriors={bottomArmyWarriors} 
                handleSelectedWarriorChange={handleSelectedWarriorChange}/>
        </div>
    )
}