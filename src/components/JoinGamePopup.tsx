import axios from "axios";
import { useEffect, useState } from 'react';
import { apiBaseUrl } from "../utils/webSocketUtil";
import { RulesConfig } from "./RulesConfigEditor";
import JoinGameButton from "./JoinGameButton";

interface joinButtonPopupProps {
    trigger : boolean;
    setTrigger : React.Dispatch<React.SetStateAction<boolean>>;
    gameType : string;
}

interface Game {
    gameId : number;
    players : { name: string }[];
    gameIsStarted : boolean;
    rulesConfig : RulesConfig;
}

interface ActiveGames {
    activeGames : Game[];
}    

function JoinGamePopup( {trigger, setTrigger, gameType} : joinButtonPopupProps ) {

    const [activeLobbies, setActiveLobbies] = useState<Game[]>([]);

    // TODO: This should be able to distinguish by gameType (i.e. activeLobbies/hearts)
    async function getActiveLobbies() {
        console.log("Get Active Button clicked");
        axios.get<ActiveGames>(`${apiBaseUrl}/games/activeLobbies`, {
            withCredentials: true
        }).then((response)=>{
            console.log(response.data);
            const activeGames = response.data.activeGames;
            setActiveLobbies(activeGames);
            return activeGames;
        }).catch((error) => {
            console.error("Error grabbing active games:", error);
        });
    }

    // TODO: Race condition?
    var intervalId : NodeJS.Timeout | undefined = undefined;
    useEffect(() => {
        if(trigger){
            getActiveLobbies();
            intervalId = setInterval(getActiveLobbies, 3000);
        } else {
            if(intervalId){
                clearInterval(intervalId);
                intervalId = undefined;
            }
        }

        return () => {
            if(intervalId){
                clearInterval(intervalId);
            }
        }
    }, [trigger]); 

    return trigger ?
    <>
        <div className="popup">
            <div className="popup-inner justify-content-center align-items-center ms-1 me-5 p-2">
                <button className="close-button btn-close" onClick={() => {setTrigger(false)}}></button>
                    {activeLobbies.length > 0 ? (
                                <ul className="vstack list-unstyled d-flex flex-wrap">
                                    {activeLobbies.map((game, index) => (
                                        <li key={index} className="list-group-item bg-secondary text-white border border-dark m-2 p-2 justify-content-center align-items-center gameRoom">
                                            <span className="p-2">
                                                Game ID: {game.gameId}, Open Slots: {game.rulesConfig.numPlayers - game.players.length}
                                            </span>
                                            <JoinGameButton gameId={game.gameId}/>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No active games available.</p>
                            )}
            </div>
        </div>
    </> : null;
}

export default JoinGamePopup