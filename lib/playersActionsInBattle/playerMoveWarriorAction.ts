import type { SetStateAction, Dispatch } from "react";
import type Warrior from "../../types/Warrior";
import type Battle from "../../types/Battle";

export const playerMoveWarriorAction = (
  tileId: string,
  warriorWhoseTurnItIsToMove: Warrior,
  battle: Battle,
  setBattle: Dispatch<SetStateAction<Battle>>,
  setPlayersWarriors: Dispatch<SetStateAction<Warrior[]>>,
  setComputersWarriors: Dispatch<SetStateAction<Warrior[]>>
) => {
  console.log("trying to move players warrior to this tile: " + tileId);
  const url = `http://localhost:3001/game/battle/warriors/moveplayerswarriortotile/${warriorWhoseTurnItIsToMove.id}/${tileId}/${battle.playersArmyId}/${battle.computersArmyId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setBattle(data.battleObject);
      setPlayersWarriors(data.playersWarriors);
      setComputersWarriors(data.computersWarriors);
    })
    .catch((error) =>
      console.error(
        `Error moving players warrior ${warriorWhoseTurnItIsToMove.name}:`,
        error
      )
    );
};
