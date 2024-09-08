import Hand from '../components/Hand'

function HeartsGame(){
    var fullHand = [["2","C"],["3","D"],["4","H"],["12", "D"]];
    var fullHand2 = [["5","H"],["2","S"],["14","C"],["13", "S"]];
    var fullHand3 = [["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["3","H"],["3","S"],["3","C"],["3", "S"],["4","H"]];


    const rotateStyle = {
        transform: 'rotate(90deg)',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-12 offset-5">
                        <Hand cards={fullHand} location="Top" isPlayer={false} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Hand cards={fullHand2} location="Left" isPlayer={false} />
                   </div>
                </div>
                <div className="row justify-content-end" >
                    <div className="col-10">
                   </div>
                    <div className="col">
                        <Hand cards={fullHand2} location="Right" isPlayer={false} />
                   </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col fixed-bottom bottomHand offset-4">
                        <Hand cards={fullHand3} location="Bottom" isPlayer={true} />
                   </div>
                </div>
            </div>
        </>
    );
}

export default HeartsGame;