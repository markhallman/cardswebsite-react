import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils/webSocketUtil";

interface RegisterProps {
    setUser: (user: string) => void;
}

function Register({setUser}: RegisterProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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

    async function register(event: React.FormEvent<HTMLFormElement>) {
        console.log("Register Button clicked");
        event.preventDefault();

        try {
            await axios.post(`${apiBaseUrl}/register`, {
                username: username,
                password: password
            }, {withCredentials: true});
            console.log("Registration successful");
            setUser(username);
        } catch (error) {
            console.error("Error registering:", error);
        }
    }

    return (
        <>
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