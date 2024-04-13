export default interface Warrior {
    id: number;

    // foreign keys
    armyId: number;

    name: string;
    class: string;
    currentStamina: number;
    gender: string;
    // warrior's img is class+gender+picture+.png, like KnightMale1.png
    picture: number;
    health: number;
    mana: number;
    stamina: number;
    strength: number;
    speed: number;
    faith: number;
    magicResistance: number;
    battleTileCurrent: string;
    hasMovedThisRound: number;
}