import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils/webSocketUtil";

interface LoginProps {
    setToken: (token: string) => void;
    setUser: (user: string) => void;
}

function Login({setToken, setUser}: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

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

    async function login(event: React.FormEvent<HTMLFormElement>) {
        console.log("Login Button clicked");
        event.preventDefault();

        try {
            const response = await axios.post(`${apiBaseUrl}/login`, {
                username: username,
                password: password
            });
            console.log("Login successful");
            // Save the token to localStorage, removing the quotes
            setToken(JSON.stringify(response.data).replace(/^"(.*)"$/, '$1'));
            setUser(username);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                {/* Logo */}
                <img src={imageUrl} width="100px" alt="Website Logo" className="mb-4" />

                {/* Login Form */}
                <form className="p-4 bg-white rounded shadow-sm" style={{ width: "350px" }} onSubmit={login}>
                    <h3 className="text-center mb-4">Login</h3>
                    <div className="form-outline mb-3">
                        <input 
                            type="username" 
                            id="form2Example1" 
                            className="form-control" 
                            placeholder="Username" 
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="form-outline mb-3">
                        <input 
                            type="password" 
                            id="form2Example2" 
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block mb-4"
                    >
                        Sign in
                    </button>
                    <p className="text-center mt-3">
                    Not a member? <br />
                    <a href="#!">Register</a>
                </p>
                </form>
            </div>
        </>
    );
}

export default Login;