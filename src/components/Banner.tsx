import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../utils/webSocketUtil";
import axios from "axios";
import { UserContext } from "../context/UserContext";

interface BannerProps {
    setUser: (user?: string) => void;
}

function Banner({setUser}: BannerProps){
    const [imageUrl, setImageUrl] = useState('');
    const userContext = useContext(UserContext);

    const navigate = useNavigate();

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

    async function logout(){
        console.log("Logout Button clicked");
        
        try {
            await axios.post(`${apiBaseUrl}/logout`, 
                {}, {withCredentials: true});
            console.log("Logout successful");
            setUser(undefined);
            navigate("/home");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

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
                            <Link className="nav-link" to="/heartsLobbyJoin">
                                Play Cards
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto p-3">
                    { userContext.username ? 
                        <>
                            <li className='nav-item me-2'>
                                <button className="nav-link" onClick={logout}>
                                    Logut
                                </button>
                            </li>
                            <li className='nav-item'>
                                <p className="mt-2 text-light"> Welcome {userContext.username}!</p> 
                            </li>
                        </>
                    :
                        <>
                            <li className='nav-item'>
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                    }
                    </ul>

                </div>
            </nav>
            <Outlet />
        </>
        );
}

export default Banner;