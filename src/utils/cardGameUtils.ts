import Card, { Suit } from '../components/Card'

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

// Player descriptors are currently sent in the following format:
    // Player --- name: <name> ID: <ID> isHumanControlled: <bool>
export const parseNameFromPlayerDescriptorString = (playerDescriptor: string) => {
    const nameMatch = playerDescriptor.match(/name:\s*([^\s]+)/);
    if (nameMatch && nameMatch[1]) {
        return nameMatch[1];
    }
    console.error("Name not found in player descriptor");
    return null;
}