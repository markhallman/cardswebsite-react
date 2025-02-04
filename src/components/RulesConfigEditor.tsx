export type RulesConfig = {
    heartsMustBeBroken : boolean,
    jackMinus10 : boolean,
    jackRequired : boolean,
    kittyWonFirstTrick : boolean,
    noTricksMinus : boolean,
    numPlayers : number,
    pointsAllowedFirstTrick : boolean,
    pointsToLose : number,
    shootTheSun : boolean,
    startCardRules : number
};

interface RulesConfigEditorProps {
    rulesConfig? : RulesConfig;
}

function RulesConfigEditor ( {rulesConfig} : RulesConfigEditorProps) {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <table className="mx-auto table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Rule</th>
                                <th>Setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>To play a heart, hearts Must Be Broken:</th>
                                <td>{rulesConfig ? (rulesConfig.heartsMustBeBroken ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Jack is worth -10 points:</th>
                                <td>{rulesConfig ? (rulesConfig.jackMinus10 ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Jack is required to shoot the moon:</th>
                                <td>{rulesConfig ? (rulesConfig.jackRequired ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Kitty is won by player winning the first trick:</th>
                                <td>{rulesConfig ? (rulesConfig.kittyWonFirstTrick ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Minus points if you win no tricks:</th>
                                <td>{rulesConfig ? (rulesConfig.noTricksMinus ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Number of players:</th>
                                <td>{rulesConfig ? rulesConfig.numPlayers : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Points allowed on the first trick:</th>
                                <td>{rulesConfig ? (rulesConfig.pointsAllowedFirstTrick ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Points to lose:</th>
                                <td>{rulesConfig ? rulesConfig.pointsToLose : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Shoot the Sun:</th>
                                <td>{rulesConfig ? (rulesConfig.shootTheSun ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Hearts Must Be Broken:</th>
                                <td>{rulesConfig ? (rulesConfig.heartsMustBeBroken ? "Yes" : "No") : "NO CONFIG FOUND"}</td>
                            </tr>
                            <tr>
                                <th>Start Card Rules:</th>
                                <td>{rulesConfig ? rulesConfig.startCardRules : "NO CONFIG FOUND"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RulesConfigEditor;