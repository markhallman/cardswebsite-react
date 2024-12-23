import Banner from '../components/Banner'
import Hand from '../components/Hand'
import { Suit } from '../components/Card'
import { UserContext } from '../context/UserContext';

function Home(){
    let homepages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList"]
    var fullHand : {suit: string, value: string, rank: string}[] = 
        [{suit: "C", value: "TWO", rank:  "2"},
            {suit: "C", value: "TWO", rank:  "2"},
            {suit: "C", value: "TWO", rank:  "2"},
            {suit: "C", value: "TWO", rank:  "2"}];
    // TODO: get the playername from login
    const playerName = "user";

    return (
        <>
            <UserContext.Provider value={{username: playerName, gameWebSocketRoot: `/hearts/game-room`}}>
                <h1><Banner pages={homepages} activePage="Home" /></h1>
                <p className="p-2"> Welcome to Coolest Card Games! A place for card game fans from all over the world to play the coolest
                card games. Really, right now thats just hearts, but what's cooler than hearts?</p>
                <Hand cards={fullHand} location="Top" isPlayer={false}/>
            </UserContext.Provider>
        </>
    );
}

export default Home;