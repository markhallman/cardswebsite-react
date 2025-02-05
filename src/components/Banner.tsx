import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { apiBaseUrl } from "../utils/webSocketUtil";
import axios from "axios";

function Banner(){
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        let objectUrl: string | null = null;
        const fetchWebsiteLogo = async () => {
            const response = await axios.get(
                `${apiBaseUrl}/images/coolestcardgames`,
                    { responseType: "blob" }
            );
            objectUrl = URL.createObjectURL(response.data);
            setImageUrl(objectUrl);
        }
        fetchWebsiteLogo();

        return () => {
            if (objectUrl) { 
                URL.revokeObjectURL(objectUrl);
            }
        }
    }, []);

    const logoStyle = {
        marginRight :'10px',
        marginLeft: '10px',
        alignVertical: 'middle'
    };

    return (
        <>
            <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <a className="navbar-brand" href="/home">
                    <img src={imageUrl} width="30px" alt="Logo" style={logoStyle} className="d-inline-block" />
                    Coolest Card Games
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav mr-auto">
                        <li className='nav-item'>
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/gamesList">
                                Join Game
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/heartsLobbyJoin">
                                Create Game
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
        );
}

export default Banner;