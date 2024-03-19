import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Account() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    postal_code: "",
    profile_image: null,
  });
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("User data from localStorage:", userData);
    if (userData) {
      const userDetail = JSON.parse(userData).userDetail;
      console.log("User detail:", userDetail);
      setFormData((prevData) => ({
        ...prevData,
        id: userDetail.id || "",
        name: userDetail.name || "",
        mobile: userDetail.mobile || "",
        email: userDetail.email || "",
        address: userDetail.address || "",
        city: userDetail.city || "",
        postal_code: userDetail.postal_code || "",
        profile_image: userDetail.profile_image_path || null,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profile_image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "profile_image" && value !== null) {
        formDataToSend.append(key, value);
      } else if (value !== null) {
        formDataToSend.append(key, value);
      }
    });
  
    try {
      const response = await fetch("http://localhost:8000/api/update-user", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
        // Ajoutez le chemin complet de l'image à l'objet updatedUserData
        updatedUserData.userDetail.profile_image_path =
          process.env.REACT_APP_API_BASE_URL +
          "/storage/photo/" +
          updatedUserData.userDetail.profile_image;
  
        console.log("Updated User:", updatedUserData);
        alert("User updated successfully!");
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error("Failed to update user:", errorData);
        alert(
          "Failed to update user. Please check the form for errors."
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to update user:", errorData);
        alert("Failed to update user. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  

  const toggleAccountInfo = () => {
    setShowAccountInfo(!showAccountInfo);
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Edit Account Information</h5>
          <form onSubmit={handleSubmit}>
            {/* First Form Section - Personal Information */}
            <fieldset>
              <legend>Personal Information</legend>
              <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="mobile" className="col-sm-2 col-form-label">
                  Mobile
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Second Form Section - Address Information */}
            <fieldset>
              <legend>Address Information</legend>
              <div className="mb-3 row">
                <label htmlFor="address" className="col-sm-2 col-form-label">
                  Address
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="city" className="col-sm-2 col-form-label">
                  City
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="postalCode"
                  className="col-sm-2 col-form-label"
                >
                  Postal Code
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Third Form Section - Profile Image */}
            <fieldset>
              <legend>Profile Image</legend>
              <div className="mb-3 row">
                <label
                  htmlFor="profileImage"
                  className="col-sm-2 col-form-label"
                >
                  Profile Image
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="profileImage"
                    name="profile_image"
                    onChange={handleFileChange}
                  />
                  {formData.profile_image && (
                    <img
                      src={URL.createObjectURL(formData.profile_image)}
                      alt="Profile"
                      style={{ marginTop: '10px', maxWidth: '100px' }}
                    />
                  )}
                </div>
              </div>
            </fieldset>

            {/* Save Changes Button */}
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>

            <Link to={`/userInfo?name=${formData.name}&email=${formData.email}&mobile=${formData.mobile}&address=${formData.address}&city=${formData.city}&postal_code=${formData.postal_code}`}className="btn btn-primary">
    Voir mes informations
</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
