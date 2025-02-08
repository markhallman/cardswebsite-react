import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils/webSocketUtil";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
    setUser: (user: string) => void;
}

function Register({setUser}: RegisterProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [registerFailed, setRegisterFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchWebsiteLogo = async () => {
            console.log("Fetching website logo");
            const response = await axios.get(
                `${apiBaseUrl}/images/coolestcardgames`,
                    { responseType: "blob" }
            );
            setImageUrl(URL.createObjectURL(response.data));
        }
        fetchWebsiteLogo();
    },[]);

    async function register(event: React.FormEvent<HTMLFormElement>) {
        console.log("Register Button clicked");
        event.preventDefault();

        try {
            await axios.post(`${apiBaseUrl}/register`, {
                username: username,
                password: password,
                email: email
            }, {withCredentials: true});
            setRegisterFailed(false);
            console.log("Registration successful, redirecting to login");
            navigate(`/login`)
        } catch (error) {
            setRegisterFailed(true);
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
            console.error("Error registering:", error);
        }
    }

    return (
        <>
            {registerFailed && <div className="alert alert-danger" role="alert">
                {errorMessage}</div>}
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                {/* Logo */}
                <img src={imageUrl} width="100px" alt="Website Logo" className="mb-4" />

                {/* Register Form */}
                <form className="p-4 bg-white rounded shadow-sm" style={{ width: "350px" }} onSubmit={register}>
                    <h3 className="text-center mb-4">Register for CCG</h3>
                    <div className="form-outline mb-3">
                        <input 
                            type="username" 
                            className="form-control" 
                            placeholder="Username" 
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="form-outline mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="form-outline mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email" 
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block mb-4"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;