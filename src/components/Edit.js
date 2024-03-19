import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Edit = () => {
    const { id } = useParams();

    const [serviceField, setServiceField] = useState({
        nom: "",
        description: ""
    });

    useEffect(() => {
        fetchService();
    }, [id]);

    const fetchService = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/services/" + id);
            if (result.data && result.data.services) {
                setServiceField(result.data.services);
            }
        } catch (err) {
            console.log("une erreur est produite");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceField(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/services/${id}`, serviceField);
            // Handle successful update, redirect or show a success message
        } catch (error) {
            console.log("Error updating service:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h3>Modifier Vos Services</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="id">ID:</label>
                            <input type="text" className="form-control" id="id" name="id" value={id} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nom">Le nom du service</label>
                            <input type="text" className="form-control" id="nom" name="nom" placeholder="Enter le nom du service" value={serviceField.nom} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" name="description" rows="3" placeholder="donner une descripton" value={serviceField.description} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Modifier</button>
                    </form>
                </div>
                <div className="container d-flex justify-content-center">
                    <button className="btn btn-primary">Retour!</button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
