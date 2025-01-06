import { ScoreboardObj } from "../pages/heartsGame";

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
    console.log("Scoreboard: " + scoreboard?.playerScores);
    return trigger ?
    <>
        <div className="popup">
            <div className="popup-inner justify-content-center align-items-center ms-1 me-5 p-2">
                <h3>Scoreboard </h3>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(scoreboard?.playerScores || {}).map(([player, score]) => (
                            <tr key={player}>
                                <td>{extractPlayerName(player)}</td>
                                <td>{score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="close-button btn-close" onClick={() => {setTrigger(false)}}></button>
            </div>
        </div>
    </> : null;
}

export default Scoreboard;