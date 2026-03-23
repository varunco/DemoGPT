import "./Auth.css";
import { useState } from "react";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(name, email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Get started with DemoGPT</p>

                <form className="auth-form" onSubmit={handleSignup}>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <button className="auth-btn">Sign Up</button>
                </form>

                <p className="auth-footer">
                    Already have an account?
                    <span className="auth-link"> Login</span>
                </p>

            </div>
        </div>
    );
}

export default Signup;