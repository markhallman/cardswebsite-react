import Banner from '../components/Banner'

function Downloads(){
    let downloadsPages = ["Home", "Downloads"]

    return (
        <>
            <h1><Banner pages={downloadsPages} activePage="Downloads" /></h1>
            <p> Downloads page</p>
        </>
    );
}

export default Downloads;