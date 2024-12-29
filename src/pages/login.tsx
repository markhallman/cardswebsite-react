function Login(){
    const websiteLogo = './src/assets/cardHand.jpeg';


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                {/* Logo */}
                <img src={websiteLogo} width="100px" alt="Website Logo" className="mb-4" />

                {/* Login Form */}
                <form className="p-4 bg-white rounded shadow-sm" style={{ width: "350px" }}>
                    <h3 className="text-center mb-4">Login</h3>
                    <div className="form-outline mb-3">
                        <input 
                            type="username" 
                            id="form2Example1" 
                            className="form-control" 
                            placeholder="Username" 
                        />
                    </div>

                    <div className="form-outline mb-3">
                        <input 
                            type="password" 
                            id="form2Example2" 
                            className="form-control" 
                            placeholder="Password" 
                        />
                    </div>

                    <button 
                        type="button" 
                        className="btn btn-primary btn-block w-100"
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