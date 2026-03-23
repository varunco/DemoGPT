import "./Auth.css";
import { useState } from "react";

function Login({ switchToSignup }) { // ✅ accept prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.reload();
        }
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
                    <span className="auth-link" onClick={switchToSignup}>
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Login;