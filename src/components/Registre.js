import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal, Button } from "react-bootstrap"; 


const Registre = ({ show, handleClose }) => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function save() {
        let alertMessage = "";
    
        if (name === "") {
            alertMessage += "Veuillez saisir votre nom\n";
        }
    
        if (mobile === "") {
            alertMessage += "Veuillez saisir votre numéro de téléphone\n";
        } else if (!Number.isInteger(Number(mobile))) {
            alertMessage += "Le numéro de téléphone doit être un entier\n";
        }
    
        if (email === "") {
            alertMessage += "Veuillez saisir votre adresse e-mail\n";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alertMessage += "Veuillez saisir une adresse e-mail valide\n";
        }
    
        if (password === "") {
            alertMessage += "Veuillez saisir votre mot de passe\n";
        }
    
        if (alertMessage !== "") {
            alert(alertMessage);
        } else {
            let item = { name, mobile, email, password };
            try {
                let response = await fetch("http://localhost:8000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                });
    
                if (response.ok) {
                    response = await response.json();
                    console.warn("response", response);
                    alert("register valide");
                    navigate("/");
                } else {
                    alert("Failed to register. Please try again.");
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert("An error occurred. Please try again later.");
            }
        }
    }
    

    return (
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <div className="form-image">
                            <img src={process.env.PUBLIC_URL + '/img/gif2.gif'} alt="Registration Image" className="register-image" />
                        </div>
      <div className="body2">
      
      <div className="wrapper">
      
                            <form>
                            <h2>inscription</h2>

                                <div className="input-box">
                                    <span className="icon"><ion-icon name="person"></ion-icon></span>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        placeholder="Entrez votre nom"
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                <span className="icon"><ion-icon name="call"></ion-icon></span>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        id="telephone"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="form-control"
                                        placeholder="Entrez votre numéro "
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
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
                                        className="form-control"
                                        placeholder="Entrez votre mot de passe"
                                        required
                                    />
                                </div>
                                <button type="button" onClick={save} className="button">
                                    S'inscrire
                                </button>
                            </form>
                            </div>
                            </div>
                            </Modal.Body>
                            
    </Modal>
    );
};

export default Registre;
