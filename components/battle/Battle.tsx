'use client'

import React, { useState, useEffect } from 'react';
import BattleMap from './BattleMap';

import type Battle from '../../types/Battle';

export default function Battle() {
    const [battle, setBattle] = useState<Battle | null>(null);

    useEffect(() => {
        const userId = 1; // Example user ID

        fetch(`http://localhost:3001/battle/getuserscurrentbattle/${userId}`)
            .then(response => response.json())
            .then(data => setBattle(data))
            .catch(error => console.error('Error fetching users current battle:', error));
    }, []); // Empty dependency array to fetch only once on mount

    return (
        <div>
            <h2>battle</h2>
            <p>round: </p>
            <p>Warriorname's turn to move</p>
            <BattleMap />
        </div>
    )
}