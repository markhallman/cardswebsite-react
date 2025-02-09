import { useState } from "react";

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
    startCardRules : number,
    gameType : string
};

// TODO: Rules defaults should probably be sourced from the server
export const DEFAULT_RULES_CONFIG = {
    heartsMustBeBroken : true,
    jackMinus10 : true,
    jackRequired : false,
    kittyWonFirstTrick : false,
    noTricksMinus : false,
    numPlayers : 4,
    pointsAllowedFirstTrick : false,
    pointsToLose : 100,
    shootTheSun : false,
    startCardRules : 0,
    gameType : "HEARTS"
}

interface RulesConfigEditorProps {
    isEditable: boolean;
    rulesConfig : RulesConfig;
    setRulesConfig : React.Dispatch<React.SetStateAction<RulesConfig>>;
}

function RulesConfigEditor ( {isEditable, rulesConfig, setRulesConfig} : RulesConfigEditorProps) {

    function CheckboxRulesSelector( {rule, ruleDescription} : {rule: string, ruleDescription : string} ){
        return (                            
            <tr>
                <th>
                    <label htmlFor={rule}>{ruleDescription}</label>
                </th>
                <td>
                    {!isEditable ? rulesConfig[rule as keyof RulesConfig] ? "YES" : "NO" :
                        <input type="checkbox"
                            className="onoffswitch-checkbox" 
                            id={rule}
                            name={rule}
                            checked={rulesConfig[rule as keyof RulesConfig] ? true : false}
                            onChange={(e)=>{
                                    setRulesConfig(
                                        {...rulesConfig, [rule]: e.target.checked }
                                )}}>
                        </input>
                    }
                </td>
            </tr>
        );
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                <form>
                    <table className="mx-auto table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Rule</th>
                                <th>Setting</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CheckboxRulesSelector 
                                rule="heartsMustBeBroken" 
                                ruleDescription="To play a heart, hearts must be broken">
                            </CheckboxRulesSelector>
                            <CheckboxRulesSelector 
                                rule="jackMinus10" 
                                ruleDescription="Jack is worth -10 points">
                            </CheckboxRulesSelector>
                            <CheckboxRulesSelector 
                                rule="jackRequired" 
                                ruleDescription="Jack is required to shoot the moon">
                            </CheckboxRulesSelector>
                            <CheckboxRulesSelector 
                                rule="kittyWonFirstTrick" 
                                ruleDescription="Player who wins the first trick wins the kitty">
                            </CheckboxRulesSelector>
                            <CheckboxRulesSelector 
                                rule="noTricksMinus" 
                                ruleDescription="Minus points if you win no tricks">
                            </CheckboxRulesSelector>
                            <tr>
                                <th>Number of players:</th>
                                <td>{rulesConfig ? rulesConfig.numPlayers : "NO CONFIG FOUND"}</td>
                            </tr>
                            <CheckboxRulesSelector 
                                rule="pointsAllowedFirstTrick" 
                                ruleDescription="Points allowed on the first trick">
                            </CheckboxRulesSelector>
                            <tr>
                                <th>Points to lose:</th>
                                <td>{rulesConfig ? rulesConfig.pointsToLose : "NO CONFIG FOUND"}</td>
                            </tr>
                            <CheckboxRulesSelector 
                                rule="shootTheSun" 
                                ruleDescription="Shoot the Sun">
                            </CheckboxRulesSelector>
                            <tr>
                                <th>Start Card Rules:</th>
                                <td>{rulesConfig ? rulesConfig.startCardRules : "NO CONFIG FOUND"}</td>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RulesConfigEditor;