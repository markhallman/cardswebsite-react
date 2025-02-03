import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { apiBaseUrl } from "../utils/webSocketUtil";

interface PlayerCardProps {
    playerName?: string; 
    iconEndpoint?: string;
    activePlayer: boolean;
}

function PlayerCard({playerName, iconEndpoint, activePlayer} : PlayerCardProps) {
    const [imageUrl, setImageUrl] = useState("");
    const userContext = useContext(UserContext);

    useEffect(() => {
        let objectUrl : string | null = null;
        let isActive : boolean = true;

        const featchPlayerIcon = async () => {
            console.log("Fetching player icon", iconEndpoint);

            const response = await axios.get(
                `${apiBaseUrl}/images/playerIcon/${iconEndpoint || "DEFAULT"}`,
                { responseType: "blob"},
            );

            // Only update state if this is the latest request
            if (isActive) {
                objectUrl = URL.createObjectURL(response.data);
                setImageUrl(objectUrl);
                console.log("iconendpoint and user :" + iconEndpoint + " " + userContext.username);
            } 
        }
        
        featchPlayerIcon();

        return () => {
            isActive = false;
        };
    }, [iconEndpoint]);

    return <>
        <div className="container p-1 d-flex flex-row justify-content-center align-items-center">
            <div className= {activePlayer ? "text-center activePlayer" : "text-center"}>
                <img src={imageUrl} className="playerIcon img-fluid img-thumbnail border-dark" alt="Player Icon" />
            </div>
            <div className="text-center border border-start-0 border-dark rounded-end p-2">
                <h2>{playerName}</h2>
            </div>
        </div>
    </>
}


export default PlayerCard;