export default interface Warrior {
    id: number;
    name: string;
    class: string;
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
}