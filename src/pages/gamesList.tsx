import Banner from '../components/Banner'

function GamesList(){
    let joinPages = ["Home", "Downloads", "HeartsLobbyJoin" ]

    // TODO: Obviously, we will need to get actual user credentials here in the future
    var username = "user";
    var password = "password";
    var basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

    const getActiveGames = () => {
        console.log("Get Active Button clicked");
        axios.get("http://localhost:8080/games/activegames", {}, {
            headers: {Authorization: basicAuthHeader}
        }).then((response)=>{
            console.log(response.status, response.data.token);
            navigate('/heartsGame')
        }).catch((error) => {
            console.error("Error creating game:", error);
        });
    }

    return (
        <>
            <h1><Banner pages={downloadsPages} activePage="Downloads" /></h1>
            <div className="content-area p-3">
                <div className="wrapper">

                </div>
            </div>
        </>
    );
}

export default GamesList;