import Banner from '../components/Banner'

function Home(){
    let homepages = ["Home", "Downloads"]

    return (
        <>
            <h1><Banner pages={homepages} activePage="Home" /></h1>
            <p> Welcome to Coolest Card Games! A place for card game fans from all over the world to play the coolest
            card games. Really, right now thats just hearts, but what's cooler than hearts?</p>
        </>
    );
}

export default Home;