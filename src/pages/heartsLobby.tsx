import Banner from '../components/Banner'
import Hand from '../components/Hand'

function HeartsLobby(){
    // TODO: Probably want some sort of heartbeat with the user so we can tell if they disconnect weirdly
    // TODO: Functinallity for removing lobbies that dont have any active users
    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    HEARTS LOBBY
                </div>
            </div>
        </>
    );
}

export default HeartsLobby;