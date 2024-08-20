import Card from '../components/Card'

interface HandProps {
    cards: string[][];
}

function Hand( {cards} : HandProps){

    return (
            <div className="container hand">
                <div className="row">
                      {cards.map( (card, index) =>
                          <Card rank={card[0]} suit={card[1]} pad={{index}} key={card} />
                      )}
                </div>
            </div>
        );
}

export default Hand;