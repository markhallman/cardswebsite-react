interface BannerProps {
    pages: string[];
    activePage: string;
}


function Banner( {pages, activePage} : BannerProps){
    const websiteLogo = './src/assets/cardHand.jpeg';
    const logoStyle = {
        marginRight :'10px',
        marginLeft: '10px',
        alignVertical: 'middle'
    };

    return (
        <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <a className="navbar-brand" href="#">
                <img src={websiteLogo} width="30px" alt="Logo" style={logoStyle} className="d-inline-block" />
                Coolest Card Games
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav">
                    {pages.map( (page) =>
                        <li className="nav-item" key={page}>
                          <a className={page === activePage ? 'nav-link active' : 'nav-link'}
                                aria-current="page"
                                href={page === "Home" ? "/" : "#/" + page.toLowerCase()}>{page}</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
        );
}

export default Banner;