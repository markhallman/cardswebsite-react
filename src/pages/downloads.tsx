
function Downloads(){
    let downloadsPages = ["Home", "Downloads", "HeartsLobbyJoin", "GamesList"]

    return (
        <>
            <div className="content-area p-3">
                <div className="wrapper">
                    <p>
                        Right now, a downloadable hearts client is only available for MacOS, we are working on a windows version.
                        We are not paying apple for a developer certificate because it is stupid and expensive,
                        so you may have to manually allow the application through system preferences if Mac is preventing you
                        from opening it
                    </p>
                    <div className="downloadCards">
                        <div className="card p-2" style={{width:300, height:200}}>
                          <div className="card-body">
                            <h5 className="card-title">MacOS Hearts Client</h5>
                            <p className="card-text"> Hearts client compatible with MacOS, must be on version 14.0 or later</p>
                            <a href="../resources/clientversions/HeartsClient-1.0.0.dmg" className="btn btn-primary">HeartsClient-1.0.0.dmg</a>
                          </div>
                        </div>
                        <div className="card p-2" style={{width:300, height:200}}>
                          <div className="card-body">
                            <h5 className="card-title">Windows Hearts Client</h5>
                            <p className="card-text"> COMING SOON</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Downloads;