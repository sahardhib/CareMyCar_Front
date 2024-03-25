import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {Modal, Button, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Visits() {

    const [showCalendar, setShowCalendar] = useState(false);
    const [showCalendarEdit, setShowCalendarEdit] = useState(false);
    const [date, setDate] = useState( new Date());
    const [mileAge, setMileAge] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setshowModalEdit] = useState(false);
    const [visits, setVisits] = useState([]);
    const [myCars, setmyCars] = useState([]);
    const [disabledDates, setdisabledDates] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataSelected, setdataSelected] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const [selectedVisistDate, setselectedVisistDate] = useState("");
    const [selectedVisistMileAge, setselectedVisistMileAge] = useState("");
    const [selectedVisistMatricule, setselectedVisistMatricule] = useState("");
    const [selectedVisistId, setselectedVisistId] = useState("");
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const getServices = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/services");
            setServices(response.data.results);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

const disableButton=()=>{
    setIsButtonDisabled(!isButtonDisabled)
}


    const addVisit = async () => {
        disableButton();
        const formData = new FormData();
        formData.append("date", date.toISOString().slice(0, 19).replace('T', ' '));
        formData.append("mileage", mileAge);
        formData.append("car_id", selectedOption);

        try {


            const response = await axios.post(
                "http://localhost:8000/api/add_visit",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );


        } catch (error) {
            console.error("Error adding visit:", error);
            console.error("Data from front :", formData);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }



    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addVisit();
        await getVisits();
        handleCloseModal();
    };
    const handleDelete = async (id) => {
        try {
            const confirmation = window.confirm("Voulez-vous vraiment supprimer cette demande de visite?");

            if (confirmation) {
                await axios.delete(`http://localhost:8000/api/delete_visit/${id}`);

                setVisits((e) => e.filter((visit) => visit.id !== id));

                console.log(visits);

                alert(`La demande de visite avec l'ID ${id} a été supprimée avec succès!`);
            } else {
                alert("La suppression de la demande de visite a été annulée.");
            }
        } catch (error) {
            console.error(`Error deleting car with ID ${id}:`, error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
    };



    const handleCloseModal = () => {
        setShowModal(!showModal);
        setMileAge(0);

    };

    const getVisits = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user')).userDetail.id;
            const response = await fetch(`http://127.0.0.1:8000/api/my_visits/${userId}`);
            const data = await response.json();
            setVisits(data.visits);
            setdisabledDates(data.dates);
        } catch (error) {
            console.error("Error fetching visits data:", error);
        }
    };
    const getMyCars = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user')).userDetail.id;
            const response = await fetch(`http://127.0.0.1:8000/api/mes_voitures/${userId}`);
            const data = await response.json();
            setmyCars(data.voitures);
        } catch (error) {
            console.error("Error fetching cars data:", error);
        }
    };
    useEffect(() => {


        getVisits();
        getMyCars();
        getServices(); // Fetch services when component mounts
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setdataSelected(true);
        setShowCalendar(false); // Close the calendar after selecting a date
    };

    // Function to toggle calendar visibility
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    const toggleCalendarEdit = () => {
        setShowCalendarEdit(!showCalendarEdit);
    };


    const tileDisabled = ({ date }) => {


        // Convert the current date to UTC to ensure consistency across timezones
        const currentDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

        // Check if the current date is included in the disabled dates array
        return disabledDates.some(disabledDate =>
            currentDateUTC.toISOString().slice(0, 10) === disabledDate
        );
    };

    const toggleShowEditModal = (data) => {
        setselectedVisistDate(data.date);
        setselectedVisistMileAge(data.mileage);
        setselectedVisistMatricule(data.voiture.matricule);
        setSelectedOption(data.voiture_id);
        setselectedVisistId(data.id);
        setshowModalEdit(!showModalEdit);



    };
    const handleCloseEditModal = () => {
        setshowModalEdit(!showModalEdit);
        setMileAge(0);

    };
    const handleDateChangeEdit = (newDate) => {
        setselectedVisistDate(newDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-'));
        setdataSelected(true);
        setShowCalendarEdit(false);
    };
    const handleCheckboxChange = (serviceId) => {
        setSelectedServices(prevSelected => {
            if (prevSelected.includes(serviceId)) {
                return prevSelected.filter(id => id !== serviceId);
            } else {
                return [...prevSelected, serviceId];
            }
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("date", selectedVisistDate);
        formData.append("mileage", selectedVisistMileAge);
        formData.append("car_id", selectedOption);
        try {


            const response = await axios.put(
                `http://localhost:8000/api/update_visit/${selectedVisistId}`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );


        } catch (error) {
            console.error("Error adding visit:", error);
            console.error("Data from front :", formData);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
        setLoading(false);

        await getVisits();
        handleCloseEditModal();


    };
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h5 className="mb-4">Votre liste des rendez-vous</h5>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-end align-items-center">
                        <Button
                            variant="success"
                            onClick={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faCalendar}/>
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table responsive striped bordered hover className="table">
                            <thead className="text-secondary">
                            <tr>
                                <th className="text-dark">Date</th>
                                <th className="text-dark">Kilométrage</th>
                                <th className="text-dark">Matricule</th>
                                <th className="text-dark">services</th>
                                <th className="text-dark">Statut</th>
                                <th className="text-dark">Actions</th>

                            </tr>
                            </thead>


                            <tbody>

                            {visits.map((pdata, index) => (
    <tr key={index}>
        <td>{pdata.date}</td>
        <td>{pdata.mileage} KM</td>
        <td>{pdata.voiture.matricule}</td>
        <td>
            {/* Display selected services if pdata.services is defined */}
            {pdata.services && pdata.services.map(serviceId => {
                const service = services.find(s => s.id === serviceId);
                return service ? <span key={service.id}>{service.nom}, </span> : null;
            })}
        </td>
        <td>{pdata.status == 0 ? "En cours" : (pdata.status == 1 ? "Accepté" : "Refusé")}</td>
        <td>
            <span className="text-primary me-2" onClick={() => toggleShowEditModal(pdata)}>
                <FontAwesomeIcon icon={faEdit}/>
            </span>
            <span className="text-danger" onClick={() => handleDelete(pdata.id)}>
                <FontAwesomeIcon icon={faTrashAlt}/>
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
                         Ajouter un rendez-vous
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formMarque">

                            <button type="button" onClick={toggleCalendar}>{
                                dataSelected?"Changer la date : ":"Choisir la date :"
                            }{ date.toLocaleDateString('en-CA', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }).replace(/\//g, '-')}</button>
                            {showCalendar && (
                                <div>
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={date}
                                        tileDisabled={tileDisabled}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formModele">
                            <Form.Label>Kilométrage :</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                placeholder="Entrez le kilométrage"
                                onChange={(e) => setMileAge(e.target.value)}
                                value={mileAge}
                            />
                        </Form.Group>
                        <Form.Group controlId="formServices">
                        <Form.Label>Services :</Form.Label>
                        {services.map((service) => (
                            <Form.Check
                                key={service.id}
                                type="checkbox"
                                id={`service-${service.id}`}
                                label={service.nom}
                                checked={selectedServices.includes(service.id)}
                                onChange={() => handleCheckboxChange(service.id)}
                            />
                        ))}
                    </Form.Group>
                        <Form.Group controlId="formModele">
                            <Form.Label>Matricule :</Form.Label>
                            <select required
                                className="form-control border border-primary"
                                onChange={(e) => setSelectedOption(e.target.value)}

                            >
                                <option value="">Select...</option>
                                {myCars.map((car) => (
                                    <option key={car.id} value={car.id}>{car.matricule}</option>
                                ))}
                            </select>
                        </Form.Group>

                        <Button variant="success" type="submit">
                            {(loading?"Traitement en cours ...":"Ajouter la demande")}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <Modal show={showModalEdit} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                         Modifier un rendez-vous
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group controlId="formMarque">

                            <button type="button" onClick={toggleCalendarEdit}>{
                                dataSelected?"Changer la date : ":"Choisir la date :"
                            }{ selectedVisistDate}</button>
                            {showCalendarEdit && (
                                <div>
                                    <Calendar
                                        onChange={handleDateChangeEdit}
                                        value={selectedVisistDate}
                                        tileDisabled={tileDisabled}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formModele">
                            <Form.Label>Kilométrage :</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                placeholder="Entrez le kilométrage"
                                onChange={(e) => setselectedVisistMileAge(e.target.value)}
                                value={selectedVisistMileAge}
                            />
                        </Form.Group>
                        <Form.Group controlId="formModele">
                            <Form.Label>Matricule :</Form.Label>
                            <select
                                required
                                className="form-control border border-primary"
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option key={selectedOption} value={selectedOption}>{selectedVisistMatricule}</option>

                                {myCars.map((car) => {
                                    if (car.matricule !== selectedVisistMatricule) {
                                        return (
                                            <option key={car.id} value={car.id}>{car.matricule}</option>
                                        );
                                    }
                                })}
                            </select>
                        </Form.Group>

                        <Button variant="success" type="submit">
                            {(loading ? "Traitement en cours ..." : "Modifier la demande")}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}


export default Visits;