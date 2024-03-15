// Alert.js
import React from "react";


const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default Alert;
