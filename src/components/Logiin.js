import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Registre from "./Registre"; // Import the Registre component

export const Logiin = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Déclaration de la variable d'état pour gérer les erreurs
    const navigate = useNavigate();

    // Function to open the modal
    const handleShow = () => setShowModal(true);

    // Function to close the modal
    const handleClose = () => setShowModal(false);

    async function authenticate() {
        setLoading(true);
        setError("");
    
        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            setLoading(false);
            return;
        }
    
        let item = { email, password };
    
        try {
            let response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
    
            response = await response.json();
    
            if (response.status) {
                localStorage.setItem("user", JSON.stringify(response));
    
                // Redirection basée sur le rôle de l'utilisateur
                if (response.data.role === "admin") {
                    navigate("/admin");
                } else if (response.data.role === "technicien") {
                    navigate("/technicien");
                } else {
                    navigate("/");
                }
            } else {
                setError("Email ou mot de passe incorrect.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Une erreur s'est produite. Veuillez réessayer.");
        }
    
        setLoading(false);
    }
    

    return (
        <div className="body1">
            <img src={process.env.PUBLIC_URL + '/img/gify.gif'} alt="Login Image" className="login-image" />

            <div className="wrapper">
                <form>
                    <h2>connexion</h2>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="person"></ion-icon></span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    <div className="forgot-pass">
                        <a href="/ForgetPassword">nsiti modpassek?</a>
                    </div>
                    {error && <p className="error">{error}</p>} {/* Affichage de l'erreur si elle est définie */}
                    <button
                        className="button"
                        type="button"
                        onClick={authenticate}
                        disabled={loading}>{loading ? "Chargement..." : "Se connecter"}</button>
                    <div className="register-link">
                        <p> Si tu n'as pas de compte, Cliquez ici! <Link to="#" onClick={handleShow} >S'inscrire </Link></p>
                    </div>
                </form>
                <Registre show={showModal} handleClose={handleClose} />
            </div>
        </div>
    );
};

export default Logiin;
