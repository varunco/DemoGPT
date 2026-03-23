import "./Auth.css";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to continue</p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="auth-btn">Login</button>
                </form>

                <p className="auth-footer">
                    Don’t have an account?
                    <span className="auth-link"> Sign up</span>
                </p>

            </div>
        </div>
    );
}

export default Login;