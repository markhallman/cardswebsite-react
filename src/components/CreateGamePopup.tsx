import axios from "axios";
import { apiBaseUrl } from "../utils/webSocketUtil";
import { useNavigate } from "react-router-dom";
import RulesConfigEditor from "./RulesConfigEditor";

interface createGamePopupProps {
    trigger : boolean;
    setTrigger : React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateGamePopup( {trigger, setTrigger} : createGamePopupProps ) {
    const navigate = useNavigate();

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

    return trigger ?
    <>
        <div className="popup">
            <div className="popup-inner justify-content-center align-items-center ms-1 me-5 p-2">
               <p>
                    Click here to create a game
               </p>
               <button className="btn btn-primary m-2" onClick={createGame}>
                                    Create Game
               </button>
               <RulesConfigEditor isEditable={true}></RulesConfigEditor>
               <button className="close-button btn-close" onClick={() => {setTrigger(false)}}></button>
            </div>
        </div>
    </> : null;
}

export default CreateGamePopup