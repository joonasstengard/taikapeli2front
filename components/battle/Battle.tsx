"use client";

import React, { useState, useEffect } from "react";
import BattleActionBar from "./BattleActionBar";
import BattleActionButtons from "./BattleActionButtons";
import BattleMap from "./BattleMap";

import type Battle from "../../types/Battle";
import type Warrior from "../../types/Warrior";

export default function Battle() {
  const [battle, setBattle] = useState<Battle | null>(null);
  const [playersWarriors, setPlayersWarriors] = useState<Warrior[]>([]);
  const [isSelectingMovingLocation, setIsSelectingMovingLocation] =
    useState<boolean>(false);
  // const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);
  const [computersWarriors, setComputersWarriors] = useState<Warrior[]>([]);
  const [warriorWhoseTurnItIsToMove, setWarriorWhoseTurnItIsToMove] =
    useState<Warrior>(null);

  useEffect(() => {
    const userId = 1; // Example user ID

    fetch(`http://localhost:3001/game/battle/getuserscurrentbattle/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setBattle(data[0]);
        return data[0];
      })
      .then((battle) => {
        if (battle) {
          Promise.all([
            fetchWarriors(userId, battle.playersArmyId, setComputersWarriors),
            fetchWarriors(userId, battle.computersArmyId, setPlayersWarriors),
          ]);
        }
      })
      .catch((error) =>
        console.error("Error fetching users current battle:", error)
      );
  }, []); // Empty dependency array to fetch only once on mount

  useEffect(() => {
    if (computersWarriors.length > 0 && playersWarriors.length > 0) {
      determineNextWarriorToMove();
    }
  }, [battle]);

  const determineNextWarriorToMove = () => {
    const allWarriors = [...computersWarriors, ...playersWarriors];
    const warriorsYetToMove = allWarriors.filter(
      (warrior) => warrior.hasMovedThisRound !== 1
    );

    if (warriorsYetToMove.length === 0) {
      console.log("returning because all warriors have moved already");
      return;
    }

    const nextWarrior = warriorsYetToMove.reduce((fastest, current) => {
      return fastest.speed > current.speed ? fastest : current;
    });
    console.log("this warrior moves next:" + nextWarrior.name);
    // computers warrior, WIP, players army id hardcoded as 1
    if (nextWarrior.armyId !== 1) {
      console.log("opponents turn");
      handleComputersTurn(battle.playersArmyId, battle.computersArmyId, nextWarrior.armyId);
    }

    setWarriorWhoseTurnItIsToMove(nextWarrior);
  };

  const fetchWarriors = (userId, armyId, setWarriors) => {
    fetch(`http://localhost:3001/game/warriors/${userId}/${armyId}`)
      .then((response) => response.json())
      .then((warriors) => setWarriors(warriors))
      .catch((error) =>
        console.error(`Error fetching warriors for armyId ${armyId}:`, error)
      );
  };

  // Function to handle the computer's turn
  const handleComputersTurn = (
    playersArmyId,
    computersArmyId,
    warriorArmyId
  ) => {
    const url = `http://localhost:3001/game/battle/computerswarriorsturn/${playersArmyId}/${computersArmyId}/${warriorArmyId}`;

    fetch(url)
      .then((response) => response.json())
      .then((updatedWarriors) => {
        // Assuming the response contains separate lists for players and computers
        console.log('logging updatedWarriors from handleComputersTurn:');
        console.log(updatedWarriors);
        setPlayersWarriors(updatedWarriors.playerArmyWarriors);
        setComputersWarriors(updatedWarriors.computerArmyWarriors);
      })
      .catch((error) =>
        console.error(`Error during the computer's turn:`, error)
      );
  };

  const handleIsSelectingMovingLocation = (isSelectingMovingLocation) => {
    console.log("handleIsSelectingMovingLocation called");
    if (!isSelectingMovingLocation) {
      setIsSelectingMovingLocation(false);
    } else {
      setIsSelectingMovingLocation(true);
    }
  };

  const handleMoveCommandWarriorToTile = (tileId) => {
    console.log("trying to move warrior to this tile: " + tileId);
    setIsSelectingMovingLocation(false);
    fetch(
      `http://localhost:3001/game/battle/warriors/movewarriortotile/${warriorWhoseTurnItIsToMove.id}/${tileId}`
    )
      .then((response) => response.json())
      .then((data) => {
        updateWarriorPosition(warriorWhoseTurnItIsToMove.id, tileId);
        determineNextWarriorToMove();
      })
      .catch((error) =>
        console.error(
          `Error moving warrior ${warriorWhoseTurnItIsToMove.name}:`,
          error
        )
      );
  };

  const updateWarriorPosition = (warriorId, newTileId) => {
    const updateWarriors = (warriors) => {
      return warriors.map((warrior) => {
        if (warrior.id === warriorId) {
          return {
            ...warrior,
            battleTileCurrent: newTileId,
            hasMovedThisRound: 1,
          };
        }
        return warrior;
      });
    };

    setPlayersWarriors((prevWarriors) => updateWarriors(prevWarriors));
    setComputersWarriors((prevWarriors) => updateWarriors(prevWarriors));
  };

  /* const handleSelectedWarriorChange = (selectedWarrior: Warrior) => {
        setSelectedWarrior(selectedWarrior);
    } */

  return (
    <div>
      <p>-battle-</p>
      <h2>round: {battle?.round}</h2>
      <p>Next to move: {warriorWhoseTurnItIsToMove?.name}</p>
      <BattleMap
        computersWarriors={computersWarriors}
        playersWarriors={playersWarriors}
        // handleSelectedWarriorChange={handleSelectedWarriorChange}
        handleMoveCommandWarriorToTile={handleMoveCommandWarriorToTile}
        isSelectingMovingLocation={isSelectingMovingLocation}
        warriorWhoseTurnItIsToMove={warriorWhoseTurnItIsToMove}
      />
      <BattleActionBar activeWarrior={warriorWhoseTurnItIsToMove} />
      <BattleActionButtons
        handleIsSelectingMovingLocation={handleIsSelectingMovingLocation}
        isSelectingMovingLocation={isSelectingMovingLocation}
      />
    </div>
  );
}
