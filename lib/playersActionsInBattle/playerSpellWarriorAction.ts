import type { SetStateAction, Dispatch } from "react";
import type Warrior from "../../types/Warrior";
import type Battle from "../../types/Battle";
import type Spell from "../../types/Spell";

export const playerSpellWarriorAction = (
  battle: Battle,
  spell: Spell,
  tileId: string,
  warriorWhoseTurnItIsToMove: Warrior,
  setBattle: Dispatch<SetStateAction<Battle>>,
  setPlayersWarriors: Dispatch<SetStateAction<Warrior[]>>,
  setComputersWarriors: Dispatch<SetStateAction<Warrior[]>>
) => {
  console.log(
    "trying to cast spell " +
      spell.name +
      "with players warrior to this tile: " +
      tileId
  );
  const url = `http://localhost:3001/game/battle/warriors/castspellwithplayerswarriortotile/${warriorWhoseTurnItIsToMove.id}/${tileId}/${spell.id}/${battle.playersArmyId}/${battle.computersArmyId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setBattle(data.battleObject);
      setPlayersWarriors(data.playersWarriors);
      setComputersWarriors(data.computersWarriors);
    })
    .catch((error) =>
      console.error(
        `Error casting spell with players warrior ${warriorWhoseTurnItIsToMove.name}:`,
        error
      )
    );
};
