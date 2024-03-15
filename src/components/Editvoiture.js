import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

function Editvoiture() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState([]);
  const [fileimage, setPhoto] = useState('');
  const [message, setMessage] = useState('');
  const [dateDeVignette, setDateDeVignette] = useState('');
  const [dateDAssurance, setDateDAssurance] = useState('');
  const [showModal, setShowModal] = useState(true);

  const [formData, setFormData] = useState(new FormData());

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Handle date fields separately
    if (name === 'date_de_vignette' || name === 'date_d_assurance') {
      name === 'date_de_vignette' ? setDateDeVignette(value) : setDateDAssurance(value);
    } else {
      setInputs(values => ({ ...values, [name]: value }));
    }
  };

  const uploadVoiture = async () => {
    try {
      formData.append('_method', 'PUT');
      formData.append('marque', inputs.marque);
      formData.append('modele', inputs.modele);
      formData.append('type', inputs.type);
      formData.append('matricule', inputs.matricule);
      formData.append('VIN', inputs.VIN);
      formData.append('date_de_vignette', dateDeVignette);
      formData.append('date_d_assurance', dateDAssurance);
      formData.append('image', fileimage);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/voituresupdate/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/ListeVoiture');
      }, 2000);
    } catch (error) {
      console.error("Error uploading voiture:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadVoiture();
  };

  useEffect(() => {
    getvoiture();
  }, []);

  async function getvoiture() {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/voitures/${id}`
      );
      setInputs(response.data.voiture);
      setDateDeVignette(response.data.voiture.date_de_vignette);
      setDateDAssurance(response.data.voiture.date_d_assurance);
    } catch (error) {
      console.error("Error fetching voiture data:", error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    // Additional cleanup if needed
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier voiture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="marque">
            <Form.Label>Marque</Form.Label>
            <Form.Control
              type="text"
              name="marque"
              onChange={handleChange}
              value={inputs.marque}
            />
          </Form.Group>

          <Form.Group controlId="modele">
            <Form.Label>Modèle</Form.Label>
            <Form.Control
              type="text"
              name="modele"
              onChange={handleChange}
              value={inputs.modele}
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              onChange={handleChange}
              value={inputs.type}
            />
          </Form.Group>

          <Form.Group controlId="matricule">
            <Form.Label>Matricule</Form.Label>
            <Form.Control
              type="text"
              name="matricule"
              onChange={handleChange}
              value={inputs.matricule}
            />
          </Form.Group>

          <Form.Group controlId="VIN">
            <Form.Label>VIN</Form.Label>
            <Form.Control
              type="text"
              name="VIN"
              onChange={handleChange}
              value={inputs.VIN}
            />
          </Form.Group>

          <Form.Group controlId="date_de_vignette">
            <Form.Label>Date de Vignette</Form.Label>
            <Form.Control
              type="date"
              name="date_de_vignette"
              onChange={handleChange}
              value={dateDeVignette}
            />
          </Form.Group>

          <Form.Group controlId="date_d_assurance">
            <Form.Label>Date d'Assurance</Form.Label>
            <Form.Control
              type="date"
              name="date_d_assurance"
              onChange={handleChange}
              value={dateDAssurance}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="success" type="submit">
            Enregistrer vos changements
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Editvoiture;
