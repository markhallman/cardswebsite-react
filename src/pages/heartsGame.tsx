import Hand from '../components/Hand'
import CardTable from '../components/CardTable'
import { Suit } from '../components/Card'

let playerHand = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];

function HeartsGame(){
    var fullHand  : [rank: string, suit: Suit][]= [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];
    var tableCards = [["14","S"],["14","S"],["14","S"],["14","S"]]

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center" >
                    <div className="col offset-4">
                        <Hand cards={fullHand} location="Top" isPlayer={false} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Hand cards={fullHand} location="Left" isPlayer={false} />
                    </div>
                    <div className="col-2 justify-content-right">
                        <Hand cards={fullHand} location="Right" isPlayer={false} />
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex col alight-items-center justify-content-center align-self-center">
                        <CardTable cards={tableCards}  />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col fixed-bottom bottomHand offset-4">
                        <Hand cards={fullHand} location="Bottom" isPlayer={true} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeartsGame;