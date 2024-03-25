import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Modal, Button, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar,faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function ListeVoiture({ onClose }) {
  const [voiture, setVoiture] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [txtmarque, setMarque] = useState("");
  const [txtmodele, setModele] = useState("");
  const [txttype, setType] = useState("");
  const [txtmatricule, setMatricule] = useState("");
  const [txtvin, setVIN] = useState("");
  const [fileimage, setPhoto] = useState("");
  const [dateDeVignette, setDateDeVignette] = useState("");
  const [dateDAssurance, setDateDAssurance] = useState("");
  const [editVoiture, setEditVoiture] = useState(null);
  const vignetteOptions = ["Pair", "Impair"];

  const getVoiture = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).userDetail.id;
      const response = await fetch(`http://127.0.0.1:8000/api/mes_voitures/${userId}`);
      const data = await response.json();
      setVoiture(data.voitures);
    } catch (error) {
      console.error("Error fetching voiture data:", error);
    }
  };

  const uploadVoiture = async () => {
    try {
      const formData = new FormData();
      formData.append("marque", txtmarque);
      formData.append("modele", txtmodele);
      formData.append("type", txttype);
      formData.append("matricule", txtmatricule);
      formData.append("VIN", txtvin);
      formData.append("date_de_vignette", dateDeVignette);
      formData.append("date_d_assurance", dateDAssurance);
      formData.append("image", fileimage);
      formData.append("user_id",  JSON.parse(localStorage.getItem('user')).userDetail.id);

      const response = await axios.post(
        "http://localhost:8000/api/voitures",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await getVoiture();

      onClose();
    } catch (error) {
      console.error("Error uploading voiture:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("marque", txtmarque);
      formData.append("modele", txtmodele);
      formData.append("type", txttype);
      formData.append("matricule", txtmatricule);
      formData.append("VIN", txtvin);
      formData.append("date_de_vignette", dateDeVignette);
      formData.append("date_d_assurance", dateDAssurance);
      formData.append("image", fileimage);

      const response = await axios.put(
        `http://localhost:8000/api/voituresupdate/${editVoiture.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setVoiture((prevVoiture) =>
        prevVoiture.map((car) =>
          car.id === editVoiture.id ? response.data : car
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error updating voiture:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadVoiture();
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm("Do you really want to delete this car?");
      
      if (confirmation) {
        await axios.delete(`http://localhost:8000/api/voituresdelete/${id}`);
        
        setVoiture((prevVoiture) => prevVoiture.filter((car) => car.id !== id));
    
        alert(`Car with ID ${id} has been deleted successfully!`);
      } else {
        alert("Car deletion has been canceled.");
      }
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  

  const handleShowModal = () => {
    setShowModal(true);
    setMarque("");
    setModele("");
    setType("");
    setMatricule("");
    setVIN("");
    setPhoto("");
    setDateDeVignette("");
    setDateDAssurance("");
    setEditVoiture(null);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setMarque("");
    setModele("");
    setType("");
    setMatricule("");
    setVIN("");
    setPhoto("");
    setDateDeVignette("");
    setDateDAssurance("");
    setEditVoiture(null);
  };

  useEffect(() => {


    getVoiture();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h5 className="mb-4">Votre liste des Véhicules</h5>
          </div>
        </div>
        <div className="row mb-3">
  <div className="col-12 d-flex justify-content-end align-items-center">
    <Button
      variant="success"
      onClick={handleShowModal}
    >
      <FontAwesomeIcon icon={faCar} />
    </Button>
  </div>
</div>
        <div className="row">
          <div className="col-12">
            <Table responsive striped bordered hover className="table">
            <thead className="text-secondary">
  <tr>
    <th className="text-dark">Marque</th>
    <th className="text-dark">Modèle</th>
    <th className="text-dark">Type</th>
    <th className="text-dark">Matricule</th>
    <th className="text-dark">VIN</th>
    <th className="text-dark">Date de Vignette</th>
    <th className="text-dark">Date d'Assurance</th>
    <th className="text-dark">Image</th>
    <th className="text-success">Action</th>
  </tr>
</thead>


              <tbody>
                {voiture.map((pdata, index) => (
                  <tr key={index}>
                    <td>{pdata.marque}</td>
                    <td>{pdata.modele}</td>
                    <td>{pdata.type}</td>
                    <td>{pdata.matricule}</td>
                    <td>{pdata.VIN}</td>
                    <td>{pdata.date_de_vignette}</td>
                    <td>{pdata.date_d_assurance}</td>
                    <td>
                    <img
 src={`http://127.0.0.1:8000/storage/photos/${pdata.image}`}
  alt={pdata.marque}
  className="img-thumbnail"
  style={{ maxWidth: "50px", maxHeight: "50px" }}
/>


                    </td>
                    <td>
                      <Link to={`/editvoiture/${pdata.id}/edit`} className="text-primary me-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <span className="text-danger" onClick={() => handleDelete(pdata.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editVoiture ? "Modifier une voiture" : "Ajouter une voiture"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editVoiture ? handleEditSubmit : handleSubmit}>
          <Form.Group controlId="formMarque">
  <Form.Label>Marque :</Form.Label>
  <Form.Control
    type="text"
    placeholder="Entrez la marque"
    onChange={(e) => setMarque(e.target.value)}
    value={txtmarque}
  />
</Form.Group>

<Form.Group controlId="formModele">
  <Form.Label>Modèle :</Form.Label>
  <Form.Control
    type="text"
    placeholder="Entrez le modèle"
    onChange={(e) => setModele(e.target.value)}
    value={txtmodele}
  />
</Form.Group>

<Form.Group controlId="formType">
  <Form.Label>Type :</Form.Label>
  <Form.Control
    type="text"
    placeholder="Entrez le type"
    onChange={(e) => setType(e.target.value)}
    value={txttype}
  />
</Form.Group>

<Form.Group controlId="formMatricule">
  <Form.Label>Matricule :</Form.Label>
  <Form.Control
    type="text"
    placeholder="Entrez la matricule"
    onChange={(e) => setMatricule(e.target.value)}
    value={txtmatricule}
  />
</Form.Group>

<Form.Group controlId="formVIN">
  <Form.Label>VIN :</Form.Label>
  <Form.Control
    type="text"
    placeholder="Entrez le VIN"
    onChange={(e) => setVIN(e.target.value)}
    value={txtvin}
  />
</Form.Group>
<Form.Group controlId="formDateDeVignette">
  <Form.Label>Date de vignette  :</Form.Label>
  <Form.Control
    type="date"
    onChange={(e) => setDateDeVignette(e.target.value)}
    value={dateDeVignette}
  />
</Form.Group>


<Form.Group controlId="formDateDAssurance">
  <Form.Label>Date d'Assurance :</Form.Label>
  <Form.Control
    type="date"
    onChange={(e) => setDateDAssurance(e.target.value)}
    value={dateDAssurance}
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
  {editVoiture ? "Enregistrer les modifications " : "Enregistrer les informations"}
</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}


export default ListeVoiture;
