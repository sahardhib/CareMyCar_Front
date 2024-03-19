import React, { useState, useEffect } from 'react';

// Importer votre avatar ou icône par défaut
  // Remplacez le chemin par le chemin réel de votre image par défaut

  const Client = () => {
    const [users, setUsers] = useState([]);
    const defaultAvatar = process.env.PUBLIC_URL + '/avatar.png';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/get-users');
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const userConfirmed = window.confirm('Are you sure you want to delete this user?');
            if (userConfirmed) {
                const response = await fetch(`http://localhost:8000/api/delete-user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    fetchUsers();
                } else {
                    console.error('Error deleting user');
                }
            }
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    return (
        <div className="client-container">
            <h1>Liste des Clients</h1>
            <div className="card-container">
                {users.map(user => (
                    <div className="card" key={user.id}>
                        <img
                            src={user.profile_image_path || defaultAvatar}
                            alt={user.name}
                            className="card-image"
                        />
                        <div className="card-details">
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Mobile: {user.mobile}</p>
                            <p>Adresse: {user.address}</p>
                            <p>Ville: {user.city}</p>
                            <p>Code postal: {user.postal_code}</p>
                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(user.id)}
                            >
                                Bloquer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default Client;
