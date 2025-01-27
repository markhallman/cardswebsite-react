import PlayerCard from "../components/PlayerCard";
import { Player } from "../pages/heartsGame";

interface PlayerDisplayProps {
    players? : Player[];
    numPlayers: number;
}

//TODO: This is rerendering a LOT, need to figure out why/how to fix
function PlayerDisplay ( {players, numPlayers} : PlayerDisplayProps ) {
    console.log("PlayerDisplay: ", players);
    if(!players){
        return <div>Loading...</div>
    }

    while (players.length < numPlayers){
        players.push({name: "AI", humanControlled: false, id: "AI", icon: "DEFAULT"});
    }

    console.log("PlayerDisplay: ", players);
    return (
        <div className="container">
            <div className="row">
                {players?.map((player, index) => (
                    <PlayerCard key={index} playerName={player.name} iconEndpoint={player.icon} activePlayer={false}/>
                   ))}
            </div>           
        </div>
    );
}

export default PlayerDisplay;