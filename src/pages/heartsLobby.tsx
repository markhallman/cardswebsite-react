import { useParams } from "react-router-dom";
import StartGameButton from '../components/StartGameButton'


function HeartsLobby(){

    const { gameId } = useParams<{ gameId: string }>();
    const numericGameId : number = Number(gameId);

    // TODO: Probably want some sort of heartbeat with the user so we can tell if they disconnect weirdly
    // TODO: Functinallity for removing lobbies that dont have any active users
    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    <h1>Welcome to the game lobby!</h1>
                    {numericGameId ? <p>Game ID: {numericGameId}</p> : <p>No game found!</p>}
                    <StartGameButton gameId={numericGameId} />
                </div>
            </div>
        </>
    );
}

export default HeartsLobby;