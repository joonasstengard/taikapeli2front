"use client"

import React, { useState, useEffect } from 'react';
import UserGoldCount from "../user/UserInfoUI";

import User from '../../types/User';

export default function GameFooter() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const userId = 1; // Example user ID

        fetch(`http://localhost:3001/game/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data[0]))
            .catch(error => console.error('Error:', error));
    }, []); // Empty dependency array to fetch only once on mount
    return (
        <div className="game-footer">
            <UserGoldCount
                user={user} />
        </div>
    );
}
