import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function AjouterVoiture({ onClose }) {
  const [txtmarque, setMarque] = useState("");
  const [txtmodele, setModele] = useState("");
  const [txttype, setType] = useState("");
  const [txtmatricule, setMatricule] = useState("");
  const [txtvin, setVIN] = useState("");
  const [fileimage, setPhoto] = useState("");

  const uploadVoiture = async () => {
    try {
      const formData = new FormData();
      formData.append("marque", txtmarque);
      formData.append("modele", txtmodele);
      formData.append("type", txttype);
      formData.append("matricule", txtmatricule);
      formData.append("VIN", txtvin);
      formData.append("image", fileimage);

      const response = await axios.post(
        "http://localhost:8000/api/voitures",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);
      // Optionally, provide user feedback for success.
      onClose(); // Close the modal upon successful submission
    } catch (error) {
      console.error("Error uploading voiture:", error);
      // Display an error message to the user or perform other error handling actions.
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadVoiture();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMarque">
            <Form.Label>Marque :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez la marque"
              onChange={(e) => setMarque(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formModele">
            <Form.Label>Modèle :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le modèle"
              onChange={(e) => setModele(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le type"
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMatricule">
            <Form.Label>Matricule :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez la matricule"
              onChange={(e) => setMatricule(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formVIN">
            <Form.Label>VIN :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le VIN"
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
}

export default AjouterVoiture;
