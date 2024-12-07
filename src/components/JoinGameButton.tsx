interface joinButtonProps {
    gameId : number;
}

function JoinGameButton( {gameId} : joinButtonProps ) {
    async function joinGame() {
        console.log("Join Game Button clicked for gameId " + gameId);
    }

    return (
        <button onClick={joinGame}>
            Join Game
        </button>
    )
}

export default JoinGameButton