import { Link, Outlet } from "react-router-dom";

function Banner(){
    const websiteLogo = './src/assets/cardHand.jpeg';
    const logoStyle = {
        marginRight :'10px',
        marginLeft: '10px',
        alignVertical: 'middle'
    };

    return (
        <>
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
                        <li className='nav-item me-3'>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className='nav-item me-3'>
                            <Link to="/gamesList">Active Games</Link>
                        </li>
                        <li className='nav-item me-3'>
                            <Link to="/heartsLobbyJoin">Create Game</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
        );
}

export default Banner;