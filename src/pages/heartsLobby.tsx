import { useParams } from "react-router-dom";

function HeartsLobby(){
    const { gameId } = useParams()

    // TODO: Probably want some sort of heartbeat with the user so we can tell if they disconnect weirdly
    // TODO: Functinallity for removing lobbies that dont have any active users
    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    <h1>Welcome to the game lobby!</h1>
                    {gameId ? <p>Game ID: {gameId}</p> : <p>No game found!</p>}
                </div>
            </div>
        </>
    );
}

export default HeartsLobby;