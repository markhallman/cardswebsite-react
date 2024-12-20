// Utility file for card game functions that may be used across multiple games

// Reindex a plauer array so that the specified player is at index 0
export const reindexPlayerArray = (player: string, playerArray?: string[]) => {
    if (!playerArray) {
        console.error("Player array not provided");
        return;
    }
    let playerIndex = playerArray.findIndex((element) => element === player);
    let reindexedArray = playerArray.slice(playerIndex).concat(playerArray.slice(0, playerIndex));
    return reindexedArray;
}


export const convertPlayerArray = (playerArray: [string, number][]) => {
    return;
}