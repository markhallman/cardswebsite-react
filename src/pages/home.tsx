import Banner from '../components/Banner'
import Hand from '../components/Hand'
import { Suit } from '../components/Card'
import { UserContext } from '../context/UserContext';

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
            <h1><Banner pages={homepages} activePage="Home" /></h1>
            <p className="p-2"> Welcome to Coolest Card Games! A place for card game fans from all over the world to play the coolest
            card games. Really, right now thats just hearts, but what's cooler than hearts?</p>
            <Hand cards={fullHand} location="Top" isPlayer={false}/>
        </>
    );
}

export default Home;