import PlayerCard from "../components/PlayerCard";

export type Player = {
    name: string;
    humanControlled: boolean;
    id: string;
}

interface PlayerDisplayProps {
    players? : Player[];
    numPlayers: number;
}

function PlayerDisplay ( {players, numPlayers} : PlayerDisplayProps ) {
    console.log("PlayerDisplay: ", players);
    return (
        <div className="container">
            <div className="row">
                {players?.map((player, index) => (
                    <>
                        <PlayerCard key={index} playerName={player.name} playerNumber={index} />
                    </>))}
            </div>           
        </div>
    );
}

export default PlayerDisplay;