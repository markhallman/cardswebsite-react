import { useCallback, useContext, useEffect } from "react";
import { ScoreboardObj } from "../pages/heartsGame";
import { UserContext } from "../context/UserContext";
import { parseNameFromPlayerDescriptorString } from "../utils/cardGameUtils";

interface ScoreboardProps {
    trigger : boolean;
    setTrigger : React.Dispatch<React.SetStateAction<boolean>>;
    scoreboard?: ScoreboardObj;
}

function Scoreboard({trigger, setTrigger, scoreboard} : ScoreboardProps) {
    const userContext = useContext(UserContext);
    const username = userContext.username;

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

    return trigger ?
    <>
        <div className="popup" onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setTrigger(false);
                }}}>
            <div className="popup-inner justify-content-center align-items-center ms-1 me-5 p-2">
                <h3>Scoreboard </h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(scoreboard?.playerScores || {})
                            .sort((player1, player2) => player1[1] - player2[1])
                            .map(([player, score]) => {
                                console.log("Player:", parseNameFromPlayerDescriptorString(player), "Username:", username);
                                return (
                                    <tr key={player} className={parseNameFromPlayerDescriptorString(player) === username ? 'table-primary bg-warning text-dark' : ''}>
                                        <td>{parseNameFromPlayerDescriptorString(player)}</td>
                                        <td>{score}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <button className="close-button btn-close" onClick={() => {setTrigger(false)}}></button>
            </div>
        </div>
    </> : null;
}

export default Scoreboard;