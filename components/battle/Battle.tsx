"use client";

import React, { useState, useEffect } from "react";
import BattleActionBar from "./BattleActionBar";
import BattleActionButtons from "./BattleActionButtons";
import BattleMap from "./BattleMap";

import { playerMoveWarriorAction } from "../../lib/playersActionsInBattle/playerMoveWarriorAction";
import { playerWaitAction } from "../../lib/playersActionsInBattle/playerWaitAction";

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
      // Adding a timeout here to still keep the delay functionality
      setTimeout(determineNextWarriorToMove, 1500);
    }
  }, [battle, computersWarriors, playersWarriors]); // Watch for changes in these arrays

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
    // computers warriors turn, WIP: players army id hardcoded as 1
    if (nextWarrior.armyId !== 1) {
      handleComputersTurn(battle.playersArmyId, battle.computersArmyId);
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
  const handleComputersTurn = (playersArmyId, computersArmyId) => {
    const url = `http://localhost:3001/game/battle/computerswarriorsturn/${playersArmyId}/${computersArmyId}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // response contains separate lists for players and computers warriors and battleObject for battle
        console.log("logging updatedWarriors from handleComputersTurn:");
        console.log(data);
        setPlayersWarriors(data.playerArmyWarriors);
        setComputersWarriors(data.computerArmyWarriors);
        setBattle(data.battleObject);
        // Introduce a 4-second delay before determining who moves next
        // setTimeout(determineNextWarriorToMove, 4000);
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

  // PLAYERS WARRIORS COMMANDS =================================================================
  const handlePlayerMoveWarrior = (tileId) => {
    // resetting stuff first
    setIsSelectingMovingLocation(false);
    // calling the helper that moves the warrior
    playerMoveWarriorAction(
      tileId,
      warriorWhoseTurnItIsToMove,
      battle,
      setBattle,
      setPlayersWarriors,
      setComputersWarriors
    );
  };

  const handlePlayerWait = () => {
    // resetting stuff first
    setIsSelectingMovingLocation(false);
    // calling helper that performs the wait action
    playerWaitAction(
      warriorWhoseTurnItIsToMove,
      battle,
      setBattle,
      setPlayersWarriors,
      setComputersWarriors
    );
  };

  // =============================================================================================

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
      <p>round: {battle?.round}</p>
      <p>battle turn counter: {battle?.turnsTaken}</p>
      <h2>{warriorWhoseTurnItIsToMove?.name}'s turn</h2>
      <BattleMap
        computersWarriors={computersWarriors}
        playersWarriors={playersWarriors}
        // handleSelectedWarriorChange={handleSelectedWarriorChange}
        handlePlayerMoveWarrior={handlePlayerMoveWarrior}
        isSelectingMovingLocation={isSelectingMovingLocation}
        warriorWhoseTurnItIsToMove={warriorWhoseTurnItIsToMove}
      />
      <BattleActionBar activeWarrior={warriorWhoseTurnItIsToMove} />
      <BattleActionButtons
        handleIsSelectingMovingLocation={handleIsSelectingMovingLocation}
        handlePlayerWait={handlePlayerWait}
        isSelectingMovingLocation={isSelectingMovingLocation}
      />
    </div>
  );
}
