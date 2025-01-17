import { useContext } from "react";
import { ScoreboardObj } from "../pages/heartsGame";
import { UserContext } from "../context/UserContext";

interface ScoreboardProps {
    trigger : boolean;
    setTrigger : React.Dispatch<React.SetStateAction<boolean>>;
    scoreboard?: ScoreboardObj;
}

function extractPlayerName(playerDescriptor: string) {
    const nameRegex = /name:\s([a-zA-Z1-9]+)/; // Regex to match "name: <name>"
    const match = playerDescriptor.match(nameRegex);
    return match ? match[1] : null; // Return the captured group or null if no match
}


function Scoreboard({trigger, setTrigger, scoreboard} : ScoreboardProps) {
    const userContext = useContext(UserContext);
    const username = userContext.username;

    return trigger ?
    <>
        <div className="popup">
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
                                console.log("Player:", extractPlayerName(player), "Username:", username);
                                return (
                                    <tr key={player} className={extractPlayerName(player) === username ? 'table-primary bg-warning text-dark' : ''}>
                                        <td>{extractPlayerName(player)}</td>
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