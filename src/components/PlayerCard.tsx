import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { apiBaseUrl } from "../utils/webSocketUtil";

interface PlayerCardProps {
    playerName: string; 
    playerNumber: number;
}

function PlayerCard({playerName, playerNumber} : PlayerCardProps) {
    const [imageUrl, setImageUrl] = useState("");
    const userContext = useContext(UserContext);
    const token = userContext.token;
    const ICON_MAP = ["Cherry", "Apple", "Banana", "Strawberry"];

    useEffect(() => {
        const featchPlayerIcon = async () => {
            console.log("playername: " + playerName)
            const iconEndpoint = playerName == "AI" ? "AI" : ICON_MAP[playerNumber]
            console.log("iconendpoint: " + iconEndpoint);
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
    }, []);

    return <>
        <div className="col-6 p-2 d-flex flex-column align-items-center">
            <div className="text-center">
                <h2>{playerName}</h2>
            </div>
            <div className="text-center">
                <img src={imageUrl} className="playerIcon img-fluid img-thumbnail border-dark" alt="Player Icon" />
            </div>
        </div>
    </>
}


export default PlayerCard;