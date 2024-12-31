import Card, { Suit } from '../components/Card'

// Utility file for card game functions that may be used across multiple games

const suitOrder = ["CLUB", "DIAMOND", "SPADE", "HEART"];
// Sort cards by suit and then rank
// Cool feature in javascript lets you pass a function to the sort method as a comparator
export const sortCards = (cards: { suit: string, value: string, rank: string }[]) => {
    return cards.sort((a, b) => {
        // Compare suits
        const suitComparison = suitOrder.indexOf(a.suit) - suitOrder.indexOf(b.suit);
        if (suitComparison !== 0) {
            return suitComparison;
        }

        // Compare ranks (convert rank to number for proper numerical sorting)
        const rankA = parseInt(a.rank, 10);
        const rankB = parseInt(b.rank, 10);
        return rankB - rankA;
    });
};

// Reindex a plauer array so that the specified player is at index 0
export const reindexPlayerArray = (player: string, playerArray?: string[]) => {
    if (!playerArray) {
        console.error("Player array not provided");
        return [];
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

export const cardRankToValue = (rank: string) => {
    console.log("Rank:", rank);
    if (rank === "1") {
        return "ONE";
    } else if (rank == "2") {
        return "TWO";
    } else if (rank == "3") {
        return "THREE";
    } else if (rank == "4") {
        return "FOUR";
    } else if (rank == "5") {
        return "FIVE";
    } else if (rank == "6") {
        return "SIX";
    } else if (rank == "7") {
        return "SEVEN";
    } else if (rank == "8") {
        return "EIGHT";
    } else if (rank == "9") {
        return "NINE";
    } else if (rank == "10") {
        return "TEN";
    } else if (rank == "11") {
        return "JACK";
    } else if (rank == "12") {
        return "QUEEN";
    } else if (rank == "13") {
        return "KING";
    } else if (rank == "14") {
        return "ACE";
    } else {
        console.error("Invalid rank: " + rank);
        return null;
    }
}