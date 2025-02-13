import Card, { Suit } from '../components/Card';
import { Player, CardObj } from '../pages/heartsGame';

interface CardTableProps {
    playerConfiguration?: Player[];
    playerTrickMap?: Map<string, CardObj>;
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

    // TODO shouldnt need cardHolder here, already in Card. Need to figure out correct CSS properties for this to work though
    return (
            <div className="cardTable justify-content-center">
               {playerTrickMap && Array.from(playerTrickMap.entries()).map( ([player, card], index) => {
                const playerIndex = playerConfiguration.findIndex((element) => element.name === player);
                return (
                  <div className={"cardHolder"} key={index} style={getTableCardStyle(playerIndex)}>
                      <Card rank={card.rank} suit={card.suit as Suit} isPlayer={true} key={playerIndex} style={{}}/>
                  </div>);
                })}
            </div>
        );
}

export default CardTable;