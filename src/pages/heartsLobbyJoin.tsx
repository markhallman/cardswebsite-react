import axios from "axios";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { apiBaseUrl } from "../utils/webSocketUtil";
import JoinGamePopup from "../components/JoinGamePopup";

function HeartsLobbyJoin(){
    // TODO: have some sort of heartbeat with the server so that we can tell if it is up or down
    let downloadsPages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList"]

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    
    async function createGame() {
        console.log("Create Game Button clicked");

        axios.post(`${apiBaseUrl}/games/creategame/hearts`, {},
             {withCredentials: true}
        ).then((response)=>{
            console.log("Creating lobby for GameId: " + response.data);
            var gameId = response.data;
            navigate(`/heartsLobby/${gameId}`)
        }).catch((error) => {
            console.error("Error creating game:", error);
        });
    }

    async function joinGamePopup(){

    }

    return (
        <>
            <div className="content-area p-3 justify-content-center">
                <div className="row justify-content-center text-center">
                    <div className="col-8">
                        <h2 className="display-4">
                            Choose your game and get started on your card-venture!!!
                        </h2>
                    </div>
                </div>
                <div className="row mt-3 justify-content-center text-center">
                    <div className="col-8 border d-flex justify-content-between">
                        <h1 className="text-danger m-3">
                            Hearts
                        </h1>
                        <p className="mt-2">
                            Four players. <br/>
                            Compete against your opponents and avoid taking hearts to win! <br/>
                            Beware the queen of spades
                        </p>
                        <button className="btn btn-primary m-2" onClick={createGame}>
                            Create Game
                        </button>
                        <button className="btn btn-secondary m-2" onClick={()=> setShowPopup(!showPopup)}>
                            Join Game
                        </button>
                    </div>
                </div>
                <div className="row mt-3 justify-content-center text-center">
                    <div className="col-8 border d-flex justify-content-between">
                        <h1 className="m-3">
                            Spades
                        </h1>
                        <p className="mt-2">
                            Four players <br/>
                            Compete with a partner to win an agreed on amount of tricks! <br/>
                            Spades are cool
                        </p>
                        <button className="btn btn-warning m-2">
                            COMING SOON
                        </button>
                    </div>
                </div>
                <JoinGamePopup trigger={showPopup} setTrigger={setShowPopup} gameType={"Hearts"}></JoinGamePopup>
            </div>
        </>
    );
}

export default HeartsLobbyJoin;