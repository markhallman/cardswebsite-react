import axios from "axios";
import React, { useMemo, useState } from "react";
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

    // useMemo because we want to trigger before deciding what to render, because we need to know if the user is authorized
    // TODO: This seems kinda weird, is there a more accepptable way to do this?
    useMemo(() => {
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

    if (isAuthorized === null || gameIsStarted === null) {
        // Show loading spinner while checking
        return <div>Loading...</div>;
    }

    // If the page isnt allowed when the game is started, and the game is started, we assume you want to be on the game page
    if((gameIsStarted && !allowWhenGameStarted)){
        return <Navigate to={`/heartsGame/${gameId}`} replace />;
    }

    // Dont allow access if the game is not started and the user wants the game pate or the user is not authorized
    if (!isAuthorized || (!gameIsStarted && allowWhenGameStarted)) {
        // Redirect if not authorized
        return <Navigate to={"/home"} replace />;
    }

    // Render the child component if authorized
    return <>{children}</>;
};

export default ProtectedRoute;