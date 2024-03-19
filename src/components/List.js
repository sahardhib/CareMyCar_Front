import React from "react";
import { NavLink } from "react-router-dom";

const List = ({ serviceData, error, handleDelete }) => {
  return (
    <div className="container">
      <h3>Détails des services</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {serviceData.map((service, i) => (
          <div className="col-md-4" key={i}>
            <div className="card my-3">
              <div className="card-body">
                <h5 className="card-title">{service.nom}</h5>
                <p className="card-text">{service.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/edit/${service.id}`} className="btn btn-success">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </NavLink>
                  <button onClick={() => handleDelete(service.id)} className="btn btn-danger">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
