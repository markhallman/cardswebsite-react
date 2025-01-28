import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
    const token = userContext.token;

    useEffect(() => {
        const featchPlayerIcon = async () => {
            console.log("playername: " + playerName)
            console.log("iconendpoint: " + iconEndpoint);

            console.log(iconEndpoint);

            if(!iconEndpoint) {
                iconEndpoint = "DEFAULT";
            }

            const response = await axios.get(
                `${apiBaseUrl}/images/playerIcon/${iconEndpoint}`,
                { responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                },
            );
            setImageUrl(URL.createObjectURL(response.data));
        }
        featchPlayerIcon();
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