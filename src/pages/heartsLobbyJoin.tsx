import axios from "axios";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { apiBaseUrl } from "../utils/webSocketUtil";
import JoinGamePopup from "../components/JoinGamePopup";
import CreateGamePopup from "../components/CreateGamePopup";

function HeartsLobbyJoin(){
    // TODO: have some sort of heartbeat with the server so that we can tell if it is up or down

    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [showJoinPopup, setShowJoinPopup] = useState<boolean>(false);
    const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
    
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

    // TODO: Factor out these game display divs into a component (can maybe define IN this class?)
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
                        { userContext.username ?
                                <>
                                <button className="btn btn-primary m-2" onClick={() =>
                                    { 
                                        setShowCreatePopup(!showCreatePopup);
                                        setShowJoinPopup(false);
                                    }}>
                                    Create Game
                                </button>
                                <button className="btn btn-secondary m-2"onClick={() =>
                                    { 
                                        setShowJoinPopup(!showJoinPopup);
                                        setShowCreatePopup(false);
                                    }}>
                                    Join Game
                                </button>
                                </>
                            :
                                <p className="mt-4 me-2 fw-bold">
                                    Register now to play!
                                </p>
                        }
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
                <JoinGamePopup trigger={showJoinPopup} setTrigger={setShowJoinPopup} gameType={"Hearts"}></JoinGamePopup>
                <CreateGamePopup trigger={showCreatePopup} setTrigger={setShowCreatePopup}></CreateGamePopup>
            </div>
        </>
    );
}

export default HeartsLobbyJoin;