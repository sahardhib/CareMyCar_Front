import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AjouterVoitureModal = ({ showModal, handleCloseModal, handleAjouterSubmit }) => {
  // State and form fields for adding a new car
  const [txtmarque, setMarque] = useState("");
  const [txtmodele, setModele] = useState("");
  const [txttype, setType] = useState("");
  const [txtmatricule, setMatricule] = useState("");
  const [txtvin, setVIN] = useState("");
  const [fileimage, setPhoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("marque", txtmarque);
    formData.append("modele", txtmodele);
    formData.append("type", txttype);
    formData.append("matricule", txtmatricule);
    formData.append("VIN", txtvin);
    formData.append("image", fileimage);

    handleAjouterSubmit(formData);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une voiture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMarque">
            <Form.Label>Marque :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez la marque"
              value={txtmarque}
              onChange={(e) => setMarque(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formModele">
            <Form.Label>Modèle :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le modèle"
              value={txtmodele}
              onChange={(e) => setModele(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le type"
              value={txttype}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMatricule">
            <Form.Label>Matricule :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez la matricule"
              value={txtmatricule}
              onChange={(e) => setMatricule(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formVIN">
            <Form.Label>VIN :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le VIN"
              value={txtvin}
              onChange={(e) => setVIN(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Photo de la voiture :</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Enregistrer les informations
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AjouterVoitureModal;
