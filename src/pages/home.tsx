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
            <h1 className="text-center p-3 display-1"> Welcome to Coolest Card Games! </h1>
            <h4 className="text-center"> A place for card game fans from all over the world to play the coolest
            card games. <br/> Really, right now thats just hearts, but what's cooler than hearts?</h4>
        </>
    );
}

export default Home;