import axios from "axios";
import { useCallback, useEffect, useState } from 'react';
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
    const escFunction = useCallback((event: { key: string; }) => {
        if (event.key === "Escape") {
            setTrigger(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

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

    //TODO: Could make a popup component to wrap contents of popup to avoid duplicated code between this
    //  and the other popup compoenents like scoreboard and createGamePopup
    return trigger ?
    <>
        <div className="popup" onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setTrigger(false);
                }}}>
            <div className="popup-inner justify-content-center align-items-center ms-1 me-5 p-2">
                <button className="close-button btn-close" onClick={() => {setTrigger(false)}}></button>
                    {activeLobbies.length > 0 ? (
                                <div className="d-flex flex-wrap justify-content-center">
                                    {activeLobbies.map((game, index) => (
                                        <div key={index} className="border border-dark rounded m-2 p-2">
                                            <span className="me-2">
                                                <b>Game ID: </b>{game.gameId}
                                                <b> Open Slots: </b>{game.rulesConfig.numPlayers - game.players.length}</span>
                                            <JoinGameButton gameId={game.gameId}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No active games available.</p>
                            )}
            </div>
        </div>
    </> : null;
}

export default JoinGamePopup