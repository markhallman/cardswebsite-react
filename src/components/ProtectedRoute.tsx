import axios from "axios";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../utils/webSocketUtil";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowWhenGameStarted: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowWhenGameStarted }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null: loading
    const [gameIsStarted, setGameIsStarted] = useState<boolean | null>(null); // null: loading

    const { gameId } = useParams(); // Extract gameId from route params if needed

    // TODO: WE ONLY WANT PROTECTED ROUTES TO DEAL WITH AUTHENTICATION AND GAME MEMBERSHIP
    //  NOT WITH WHETHER THE GAME HAS STARTED, THAT LOGIC SHOULD BE SEPARATE
    useLayoutEffect(() => {
        console.log("Revalidating protected route");
        setGameIsStarted(null);
        setIsAuthorized(null);
        const checkAuthorizationForGame = async () => {
            try {
                // Replace with your API call logic
                const response = await axios.get(`${apiBaseUrl}/games/authenticated/${gameId}`, {
                    withCredentials: true,
                });
                setIsAuthorized(response.data);
                console.log(response.data);
            } catch (error) {
                setIsAuthorized(false); // Treat API errors as unauthorized
            }
        };

        // TODO: This should be migrated to lobby page? Or is this even necessary?
        const checkGameStatus = async () => {   
            // Replace with your API call logic
            const response = await axios.get(`${apiBaseUrl}/games/isStarted/${gameId}`, {
                withCredentials: true,
            });
            console.log("Gameisstarted: " + response.data);
            setGameIsStarted(response.data);
            return response.status;
        }

        checkAuthorizationForGame();
        checkGameStatus()
            .then((res) => {
                switch(res){
                    case 200:
                        console.log("Game status checked");
                        break;
                    case 422:
                        console.error("Game does not exist");
                        // TODO: Redirect to a 404 page? Redirect to to home?
                        break;
                    case 500:
                        console.error("Internal server error");
                        // TODO: Redirect to a 404 page? Redirect to to home?
                        break;
                }
            });
    }, [allowWhenGameStarted]);

    if (isAuthorized === null) {
        // Show loading spinner while checking
        return <div>Loading...</div>;
    }

    if (isAuthorized === false){
        // TODO: better 403 or unauthorized page
        return <div>403 UNAUTHORIZED: you are not authorized, go away</div>
    }

    // Render the child component if authorized
    return <>{children}</>;
};

export default ProtectedRoute;