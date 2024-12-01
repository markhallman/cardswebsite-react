import Banner from '../components/Banner'
import Hand from '../components/Hand'

function Home(){
    let homepages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList"]
    var fullHand = [["2","C"],["3","D"],["4","H"],["12", "D"]];

    return (
        <>
            <h1><Banner pages={homepages} activePage="Home" /></h1>
            <p className="p-2"> Welcome to Coolest Card Games! A place for card game fans from all over the world to play the coolest
            card games. Really, right now thats just hearts, but what's cooler than hearts?</p>
            <Hand cards={fullHand} />
        </>
    );
}

export default Home;