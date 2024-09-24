import Banner from '../components/Banner'

function HeartsLobbyJoin(){
    let downloadsPages = ["Home", "Downloads", "HeartsGame"]

    return (
        <>
            <h1><Banner pages={downloadsPages} activePage="HeartsGame" /></h1>
            <div className="content-area p-3">
                <div className="wrapper">
                    <p>
                        Landing page for creating a hearts lobby
                    </p>
                    <div className="downloadCards">

                    </div>
                </div>
            </div>
        </>
    );
}

export default HeartsLobbyJoin;