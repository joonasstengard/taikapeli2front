export default interface User {
    id: number;

    // foreign keys
    userId: number;
    topArmyId: number;
    bottomArmyId: number;
    
    round: number;
    isCurrentlyHappening: number;
}