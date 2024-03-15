import React from "react";
import ReactDOM from 'react-dom/client';
import { NavLink } from "react-router-dom";


function  Voiture() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-1g-0">
                            <li className="nav-item">
                                <NavLink to="/Voiture" className="nav-link" aria-current="page">Care My Car</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/ListeVoiture" className="nav-link" >Liste des voitures</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/AjouterVoiture" className="nav-link" >Ajouter une véhicule</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )}
        
export default Voiture;