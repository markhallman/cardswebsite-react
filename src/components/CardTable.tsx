import Card from '../components/Card'

interface CardTableProps {
    cards: string[][];
}

function CardTable( {cards} : CardTableProps){
    let cardStyle = {
        marginTop: 300,
    }

    return (
            <div className="cardTable">
                  {cards.map( (card, index) =>
                  <div className={"cardHolder"} style={cardStyle}>
                      <Card rank={card[0]} suit={card[1]} isPlayer={true}/>
                  </div>)}
            </div>
        );
}

export default CardTable;