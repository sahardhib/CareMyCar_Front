// Service.js

import React, { useState, useEffect } from "react";
import List from './List';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Service = () => {
    const [showModal, setShowModal] = useState(false);
    const [serviceData, setServiceData] = useState([]);
    const [error, setError] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const fetchData = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/services");
            setServiceData(result.data.results);
            setError(null); 
        } catch (err) {
            setError("Une erreur est survenue lors de la récupération des données.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/servicedelete/${id}`);
            const newServiceData = serviceData.filter((item) => item.id !== id);
            setServiceData(newServiceData);
        } catch (err) {
            setError("Une erreur est survenue lors de la suppression du service.");
        }
    };

    const handleAddService = async (nom, description) => {
        try {
            await axios.post("http://127.0.0.1:8000/api/addnew", {
                nom: nom,
                description: description,
            });
            toggleModal(); // Fermer le modal après un ajout réussi
            fetchData(); // Rafraîchir les données après un ajout réussi
        } catch (error) {
            console.error("Erreur lors de l'ajout du service:", error);
            setError("Une erreur est survenue lors de l'ajout du service.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div>
                        <button className="btn btn-primary mb-3" onClick={toggleModal}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <Modal show={showModal} onHide={toggleModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Ajouter un service</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddServiceForm handleAddService={handleAddService} />
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="col-md-12">
                    <List serviceData={serviceData} error={error} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

const AddServiceForm = ({ handleAddService }) => {
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleAddService(nom, description);
            // Réinitialiser les champs du formulaire après une soumission réussie
            setNom("");
            setDescription("");
        } catch (error) {
            console.error("Erreur lors de l'ajout du service:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom">Le nom du service</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        placeholder="Entrez le nom du service"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Donner une description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <Button variant="primary" type="submit">
                    Ajouter
                </Button>
            </form>
        </>
    );
};

export default Service;
