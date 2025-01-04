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
            <h1>Rules Config Editor</h1>
            <div className="row">
                <div className="rules-grid col-6 p-2">
                    <div>Hearts Must Be Broken:</div>
                    <div>Jack is worth -10:</div>
                    <div>Jack is required:</div>
                    <div>Kitty is won by player winning the first trick:</div>
                    <div>Minus points if you win no tricks:</div>
                    <div>Number of players:</div>
                    <div>Are points allowed on the first trick:</div>
                    <div>Points to lose:</div>
                    <div>Shoot the Sun:</div>
                    <div>Start Card Rules:</div>
                </div>
                <div className="rules-grid col-6 p-2">
                    <div>{rulesConfig ? (rulesConfig.heartsMustBeBroken ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? (rulesConfig.jackMinus10 ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? (rulesConfig.jackRequired ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? (rulesConfig.kittyWonFirstTrick ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? (rulesConfig.noTricksMinus ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? rulesConfig.numPlayers : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? (rulesConfig.pointsAllowedFirstTrick ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? rulesConfig.pointsToLose : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? (rulesConfig.shootTheSun ? "Yes" : "No") : "NO CONFIG FOUND"}</div>
                    <div>{rulesConfig ? rulesConfig.startCardRules : "NO CONFIG FOUND"}</div>
                </div>
            </div>
        </div>
    );
}

export default RulesConfigEditor;