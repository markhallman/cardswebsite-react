import React, { useState, useEffect, useContext, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../context/UserContext'

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowWhenGameStarted: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowWhenGameStarted }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null: loading
    const [gameIsStarted, setGameIsStarted] = useState<boolean | null>(null); // null: loading

    const { gameId } = useParams(); // Extract gameId from route params if needed
    const userContext = useContext(UserContext);
    const token = userContext.token;

    // useMemo because we want to trigger before deciding what to render, because we need to know if the user is authorized
    useMemo(() => {
        console.log("Revalidating protected route");
        setGameIsStarted(null);
        setIsAuthorized(null);
        const checkAuthorization = async () => {
            try {
                // Replace with your API call logic
                const response = await axios.get(`http://localhost:8080/games/authenticated/${gameId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setIsAuthorized(response.data);
            } catch (error) {
                setIsAuthorized(false); // Treat API errors as unauthorized
            }
        };

        const checkGameStatus = async () => {   
            try {
                // Replace with your API call logic
                const response = await axios.get(`http://localhost:8080/games/isStarted/${gameId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                console.log("Gameisstarted: " + response.data);
                setGameIsStarted(response.data);
            } catch (error) {
                setGameIsStarted(null); // If the API call fails, we don't know if the game is started
                setTimeout(checkGameStatus, 1000); // try again
            }
        }

        checkAuthorization();
        checkGameStatus();
    }, [token, allowWhenGameStarted]);

    if (isAuthorized === null || gameIsStarted === null) {
        // Show loading spinner while checking
        return <div>Loading...</div>;
    }

    // Dont allow access if the game is started and the user wants the lobby page,
    //  or the game is not started and the user wants the game page
    if (!isAuthorized || (gameIsStarted && !allowWhenGameStarted) || (!gameIsStarted && allowWhenGameStarted)) {
        // Redirect if not authorized
        return <Navigate to={"/home"} replace />;
    }

    // Render the child component if authorized
    return <>{children}</>;
};

export default ProtectedRoute;