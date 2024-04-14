import type { SetStateAction, Dispatch } from "react";
import type Warrior from "../../types/Warrior";
import type Battle from "../../types/Battle";

export const playerWaitWarriorAction = (
  warriorWhoseTurnItIsToMove: Warrior,
  battle: Battle,
  setBattle: Dispatch<SetStateAction<Battle>>,
  setPlayersWarriors: Dispatch<SetStateAction<Warrior[]>>,
  setComputersWarriors: Dispatch<SetStateAction<Warrior[]>>
) => {
  console.log("this warrior is waiting: " + warriorWhoseTurnItIsToMove.name);
  const url = `http://localhost:3001/game/battle/warriors/playerswarriorwait/${warriorWhoseTurnItIsToMove.id}/${battle.playersArmyId}/${battle.computersArmyId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setBattle(data.battleObject);
      setPlayersWarriors(data.playersWarriors);
      setComputersWarriors(data.computersWarriors);
    })
    .catch((error) =>
      console.error(
        `Error with players warrior waiting ${warriorWhoseTurnItIsToMove.name}:`,
        error
      )
    );
};
