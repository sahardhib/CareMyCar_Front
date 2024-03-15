
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Logiin from "./Logiin";


function Authen() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function authenticate() {
        let item = { email, password };

        let response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        try {
            response = await response.json();

            if (response.status) {
                localStorage.setItem("users", JSON.stringify(response))
                navigate("/");
            } else {
                // Login failed, handle errors
                if (response.code === 404) {
                    alert("Email does not exist");
                } else if (response.code === 401) {
                    if (response.message === "Email not verified") {
                        alert("Email not verified");
                    } else if (response.message === "Incorrect password") {
                        alert("Incorrect password");
                    }
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    }
    return (
        <div>
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user" />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <input type="button"
                                value="login"
                                onClick={authenticate}
                                className="btn btn-primary btn-block" />
                        </form>
                        <form action="#" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user" />
                                <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your name"
                                        required
                                    />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope" />
                                <input
                                        type="tel"
                                        name="telephone"
                                        id="telephone"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your telephone"
                                        required
                                    />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" />
                                <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                    />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" />
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>
                            <input type="submit" className="btn" value="Sign up" />
                        </form>
                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
                            <button className="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="img/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
                            <button className="btn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src="img/register.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authen;
