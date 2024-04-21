export default interface Battle {
    id: number;

    // foreign keys
    userId: number;
    playersArmyId: number;
    computersArmyId: number;
    // this is null until one army wins, then its that armys id
    winningArmyId: number;
    
    // full rounds where every warrior has moved once
    round: number;
    // turns taken by individual warriors, for example in a 5vs5 match
    // one round can have 10 turns
    turnsTaken: number;

    isCurrentlyHappening: number;
}