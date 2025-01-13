import Hand from '../components/Hand';

function Home(){
    let homepages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList"]
    var fullHand : {suit: string, value: string, rank: string}[] = 
        [{suit: "CLUB", value: "TWO", rank:  "2"},
            {suit: "CLUB", value: "TWO", rank:  "2"},
            {suit: "CLUB", value: "TWO", rank:  "2"},
            {suit: "CLUB", value: "TWO", rank:  "2"}];
    // TODO: get the playername from login
    const playerName = "user";

    return (
        <>
            <p className="p-2"> Welcome to Coolest Card Games! A place for card game fans from all over the world to play the coolest
            card games. Really, right now thats just hearts, but what's cooler than hearts?</p>
            <Hand cards={fullHand} location="Top" isPlayer={false}/>
        </>
    );
}

export default Home;