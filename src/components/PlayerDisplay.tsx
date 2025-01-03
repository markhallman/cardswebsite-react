interface PlayerDisplayProps {
    players? : string[];
    numPlayers: number;
}

function PlayerDisplay ( {players, numPlayers} : PlayerDisplayProps ) {
    return (
        <div className="container">
        <h1>Player Display</h1>
            <div className="row">
                {players?.map((player, index) => (
                    <div key={index} className="col-12 p-2">
                        {player}
                    </div>))}
            </div>           
        <p>Number of Players: {numPlayers}</p>
        </div>
    );
}

export default PlayerDisplay;