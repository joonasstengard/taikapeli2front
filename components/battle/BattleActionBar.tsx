import type { SetStateAction, Dispatch } from "react";
import Image from "next/image";
import ButtonishText from "../common/ButtonishText";
import type Spell from "../../types/Spell";
import type Warrior from "../../types/Warrior";

interface Props {
  activeWarrior: Warrior;
  displayWhat: "warriorStats" | "warriorSpells" | "warriorSkills";
  setIsSelectingAttackingTarget: Dispatch<SetStateAction<boolean>>;
  setIsSelectingMovingLocation: Dispatch<SetStateAction<boolean>>;
  setIsSelectingSpellTargetForSpell: Dispatch<SetStateAction<Spell | null>>;
}

export default function BattleActionBar({
  activeWarrior,
  displayWhat,
  setIsSelectingAttackingTarget,
  setIsSelectingMovingLocation,
  setIsSelectingSpellTargetForSpell,
}: Props) {
  const activeWarriorImagePath = `/WarriorPictures/PixelStyle/${activeWarrior?.class}${activeWarrior?.gender}${activeWarrior?.picture}.webp`;

  const handleSpellSelect = (id: number) => {
    // reset others first
    setIsSelectingAttackingTarget(false);
    setIsSelectingMovingLocation(false);

    setIsSelectingSpellTargetForSpell(activeWarrior?.spells[id]);
    console.log("selected spell: " + activeWarrior?.spells[id].name);
  };

  if (!activeWarrior) {
    return null;
  }

  return (
    <div className="battle-action-bar">
      <p className="warrior-title-text">
        <b>{activeWarrior?.name}</b>, {activeWarrior?.class}
      </p>
      <div className="image-and-texts">
        <div className="selected-warrior-image">
          {activeWarrior && (
            <Image
              src={activeWarriorImagePath}
              alt={activeWarrior?.name}
              height={85}
              width={85}
            />
          )}
        </div>
        {
          /* display warriors stats */ displayWhat === "warriorStats" && (
            <>
              <div className="left-grid">
                <p>
                  Health: {activeWarrior?.currentHealth}/{activeWarrior?.health}
                </p>
                <p>
                  Mana: {activeWarrior?.currentMana}/{activeWarrior?.mana}
                </p>
                <p>
                  Stamina: {activeWarrior?.currentStamina}/
                  {activeWarrior?.stamina}
                </p>
              </div>

              <div className="center-grid">
                <p>Strength: {activeWarrior?.strength}</p>
                <p>Speed: {activeWarrior?.speed}</p>
                <p>Faith: {activeWarrior?.faith}</p>
              </div>

              <div className="right-grid">
                <p>MR: {activeWarrior?.magicResistance}</p>
              </div>
            </>
          )
        }{" "}
        {
          /* display warriors spells */ displayWhat === "warriorSpells" && (
            <>
              <div className="left-grid">
                {activeWarrior.spells[0] ? (
                  <ButtonishText
                    buttonText={activeWarrior.spells[0]?.name}
                    disabled={
                      activeWarrior.spells[0]?.manaCost >
                      activeWarrior.currentMana
                    }
                    id={0}
                    onClick={handleSpellSelect}
                  />
                ) : (
                  <p>No spells</p>
                )}
                <ButtonishText
                  buttonText={activeWarrior.spells[1]?.name}
                  disabled={
                    activeWarrior.spells[1]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={1}
                  onClick={handleSpellSelect}
                />
                <ButtonishText
                  buttonText={activeWarrior.spells[2]?.name}
                  disabled={
                    activeWarrior.spells[2]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={2}
                  onClick={handleSpellSelect}
                />
              </div>

              <div className="center-grid">
                <ButtonishText
                  buttonText={activeWarrior.spells[3]?.name}
                  disabled={
                    activeWarrior.spells[3]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={3}
                  onClick={handleSpellSelect}
                />
                <ButtonishText
                  buttonText={activeWarrior.spells[4]?.name}
                  disabled={
                    activeWarrior.spells[4]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={4}
                  onClick={handleSpellSelect}
                />
                <ButtonishText
                  buttonText={activeWarrior.spells[5]?.name}
                  disabled={
                    activeWarrior.spells[5]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={5}
                  onClick={handleSpellSelect}
                />
              </div>

              <div className="right-grid">
                <ButtonishText
                  buttonText={activeWarrior.spells[6]?.name}
                  disabled={
                    activeWarrior.spells[6]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={6}
                  onClick={handleSpellSelect}
                />
                <ButtonishText
                  buttonText={activeWarrior.spells[7]?.name}
                  disabled={
                    activeWarrior.spells[7]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={7}
                  onClick={handleSpellSelect}
                />
                <ButtonishText
                  buttonText={activeWarrior.spells[8]?.name}
                  disabled={
                    activeWarrior.spells[8]?.manaCost >
                    activeWarrior.currentMana
                  }
                  id={8}
                  onClick={handleSpellSelect}
                />
              </div>
            </>
          )
        }
      </div>
      <style jsx>{`
        .battle-action-bar {
          background-color: #3b3b3b;
          color: white;
          padding: 2px;
        }
        .image-and-texts {
          display: flex;
          background-color: #212121;
          color: white;
          align-items: center;
          font-size: 13px;
        }
        .selected-warrior-image {
          background-color: white;
          max-width: 85px;
          margin-right: 20px; /* Adjust spacing as needed */
        }
        .left-grid,
        .center-grid,
        .right-grid {
          display: flex;
          flex-direction: column;
          margin-right: 20px; /* Adjust spacing between grids */
        }
        .warrior-title-text {
          font-size: 14px;
          padding: 2px;
        }
      `}</style>
    </div>
  );
}
