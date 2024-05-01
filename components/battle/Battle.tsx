"use client";

import React, { useState, useEffect } from "react";
import BattleActionBar from "./BattleActionBar";
import BattleActionButtons from "./BattleActionButtons";
import BattleCommentary from "./BattleCommentary";
import BattleMap from "./BattleMap";

import { playerAttackWarriorAction } from "../../lib/playersActionsInBattle/playerAttackWarriorAction";
import { playerMoveWarriorAction } from "../../lib/playersActionsInBattle/playerMoveWarriorAction";
import { playerSpellWarriorAction } from "../../lib/playersActionsInBattle/playerSpellWarriorAction";
import { playerWaitWarriorAction } from "../../lib/playersActionsInBattle/playerWaitWarriorAction";

import type Battle from "../../types/Battle";
import type Spell from "../../types/Spell";
import type Warrior from "../../types/Warrior";

export default function Battle() {
  const [battle, setBattle] = useState<Battle | null>(null);
  // display warriors stats, skills or spells in the BattleActionBar
  const [battleActionBarDisplayWhat, setBattleActionBarDisplayWhat] = useState<
    "warriorStats" | "warriorSpells" | "warriorSkills"
  >("warriorStats");
  const [computersWarriors, setComputersWarriors] = useState<Warrior[]>([]);
  const [playersWarriors, setPlayersWarriors] = useState<Warrior[]>([]);
  const [isSelectingAttackingTarget, setIsSelectingAttackingTarget] =
    useState<boolean>(false);
  const [isSelectingMovingLocation, setIsSelectingMovingLocation] =
    useState<boolean>(false);
  // if null, not selecting spell target. otherwise contains spell object for spell that is being targeted
  const [isSelectingSpellTargetForSpell, setIsSelectingSpellTargetForSpell] =
    useState<Spell | null>(null);
  // const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);
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
      // small timeout added here, just to artificially make turns a bit longer for now, can be removed
      setTimeout(determineNextWarriorToMove, 1000);
    }
  }, [battle, computersWarriors, playersWarriors]); // Watch for changes in these arrays

  const determineNextWarriorToMove = () => {
    const allWarriors = [...computersWarriors, ...playersWarriors];
    const warriorsYetToMove = allWarriors.filter(
      (warrior) => warrior.hasMovedThisRound !== 1 && warrior.currentHealth > 0
    );

    if (warriorsYetToMove.length === 0) {
      console.log("returning because all warriors have moved already");
      return;
    }

    const nextWarrior = warriorsYetToMove.reduce((fastest, current) => {
      return fastest.speed > current.speed ? fastest : current;
    });
    console.log("this warrior moves next:" + nextWarrior.name);
    console.log(nextWarrior);
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
        setPlayersWarriors(data.playerArmyWarriors);
        setComputersWarriors(data.computerArmyWarriors);
        setBattle(data.battleObject);
      })
      .catch((error) =>
        console.error(`Error during the computer's turn:`, error)
      );
  };

  // PLAYERS WARRIORS COMMANDS =================================================================
  // player attacks with their warrior to this tile (it has a warrior in it)
  const handlePlayerAttack = (tileId: string) => {
    // calling the helper
    playerAttackWarriorAction(
      tileId,
      warriorWhoseTurnItIsToMove,
      battle,
      setBattle,
      setPlayersWarriors,
      setComputersWarriors
    );
    // resetting stuff
    setIsSelectingAttackingTarget(false);
    setIsSelectingMovingLocation(false);
    setIsSelectingSpellTargetForSpell(null);
  };

  const handlePlayerMoveWarrior = (tileId: string) => {
    // calling the helper that moves the warrior
    playerMoveWarriorAction(
      tileId,
      warriorWhoseTurnItIsToMove,
      battle,
      setBattle,
      setPlayersWarriors,
      setComputersWarriors
    );
    // resetting stuff
    setIsSelectingAttackingTarget(false);
    setIsSelectingMovingLocation(false);
    setIsSelectingSpellTargetForSpell(null);
  };

  const handlePlayerSpell = (spell: Spell, tileId: string) => {
    // calling the helper
    playerSpellWarriorAction(
      battle,
      spell,
      tileId,
      warriorWhoseTurnItIsToMove,
      setBattle,
      setPlayersWarriors,
      setComputersWarriors
    );
    // resetting stuff
    setIsSelectingAttackingTarget(false);
    setIsSelectingMovingLocation(false);
    setIsSelectingSpellTargetForSpell(null);
  };

  const handlePlayerWait = () => {
    // calling helper that performs the wait action
    playerWaitWarriorAction(
      warriorWhoseTurnItIsToMove,
      battle,
      setBattle,
      setPlayersWarriors,
      setComputersWarriors
    );
    // resetting stuff
    setIsSelectingAttackingTarget(false);
    setIsSelectingMovingLocation(false);
    setIsSelectingSpellTargetForSpell(null);
  };

  // =============================================================================================

  /* const handleSelectedWarriorChange = (selectedWarrior: Warrior) => {
        setSelectedWarrior(selectedWarrior);
    } */

  // wip: victory/defeat screen
  if (battle?.winningArmyId) {
    return (
      <div>
        <p>Army with the id of: {battle.winningArmyId} has won the battle!</p>
      </div>
    );
  }

  return (
    <div>
      <p>round: {battle?.round}</p>
      <p>battle turn counter: {battle?.turnsTaken}</p>
      <h2>{warriorWhoseTurnItIsToMove?.name}'s turn</h2>
      <BattleCommentary commentaryLastLine={battle?.commentaryLastLine} />
      <BattleMap
        computersWarriors={computersWarriors}
        playersWarriors={playersWarriors}
        // handleSelectedWarriorChange={handleSelectedWarriorChange}
        handlePlayerAttack={handlePlayerAttack}
        handlePlayerMoveWarrior={handlePlayerMoveWarrior}
        handlePlayerSpell={handlePlayerSpell}
        isSelectingAttackingTarget={isSelectingAttackingTarget}
        isSelectingMovingLocation={isSelectingMovingLocation}
        isSelectingSpellTargetForSpell={isSelectingSpellTargetForSpell}
        warriorWhoseTurnItIsToMove={warriorWhoseTurnItIsToMove}
      />
      <BattleActionBar
        activeWarrior={warriorWhoseTurnItIsToMove}
        displayWhat={battleActionBarDisplayWhat}
        setIsSelectingAttackingTarget={setIsSelectingAttackingTarget}
        setIsSelectingMovingLocation={setIsSelectingMovingLocation}
        setIsSelectingSpellTargetForSpell={setIsSelectingSpellTargetForSpell}
      />
      <BattleActionButtons
        handlePlayerWait={handlePlayerWait}
        isSelectingAttackingTarget={isSelectingAttackingTarget}
        isSelectingMovingLocation={isSelectingMovingLocation}
        setBattleActionBarDisplayWhat={setBattleActionBarDisplayWhat}
        setIsSelectingAttackingTarget={setIsSelectingAttackingTarget}
        setIsSelectingMovingLocation={setIsSelectingMovingLocation}
        setIsSelectingSpellTargetForSpell={setIsSelectingSpellTargetForSpell}
      />
    </div>
  );
}
