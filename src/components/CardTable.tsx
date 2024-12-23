import Card, { Suit } from '../components/Card'

interface CardTableProps {
    playerConfiguration?: string[];
    playerTrickMap?: Map<string,  {suit : string, value : string, rank : string}>;
}

function getTableCardStyle(index : number) {
    // Get the position of the card on the table based on index
    let cardStyle = {}
    if (index == 2) {
        cardStyle = {
            marginLeft: 165,
            marginTop: 10
        }
    } else if(index == 3) {
        cardStyle = {
            marginLeft: 300,
            marginTop: 100
        }
    } else if(index == 0) {
        cardStyle = {
            marginLeft: 165,
            marginTop: 170
        }
    } else if(index == 1) {
        cardStyle = {
            marginLeft: 20,
            marginTop: 100
        }
    }

    return cardStyle;
}

// TODO: Need to reconfigure so that the cards are displayed in the correct order, with a map from player to card
function CardTable( {playerConfiguration, playerTrickMap} : CardTableProps){
    if (!playerConfiguration) {
        console.error("Player configuration not provided");
        return null; // TODO: just return an empty table
    }

    return (
            <div className="cardTable">
               {playerTrickMap && Array.from(playerTrickMap.entries()).map( ([player, card], index) => {
                const playerIndex = playerConfiguration.findIndex((element) => element === player);
                console.log("Player Index: " + playerIndex);
                return (
                  <div className={"cardHolder"} key={index} style={getTableCardStyle(playerIndex)}>
                      <Card rank={card.rank} suit={card.suit as Suit} isPlayer={true} key={playerIndex}/>
                  </div>);
                })}
            </div>
        );
}

export default CardTable;