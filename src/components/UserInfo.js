import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function UserInfo() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const mobile = searchParams.get('mobile');
    const address = searchParams.get('address');
    const city = searchParams.get('city');
    const postalCode = searchParams.get('postal_code');
    const profileImage = searchParams.get('profile_image');
  
    return (
      <div className="user-info-container card">
        <h2>Informations de l'utilisateur</h2>
        <div className="user-info">
          {profileImage && (
            <div className="profile-image-container">
              <img src={profileImage} alt="Profile" className="profile-image" />
            </div>
          )}
          <p><strong>Nom:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Téléphone:</strong> {mobile}</p>
          <p><strong>Adresse:</strong> {address}</p>
          <p><strong>Ville:</strong> {city}</p>
          <p><strong>Code postal:</strong> {postalCode}</p>
        </div>
        <Link to="/Account" className="btn btn-primary">Aller à mon compte</Link>
      </div>
    );
  }

export default UserInfo;
