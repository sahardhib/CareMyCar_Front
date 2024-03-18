import React, { useState, useEffect } from 'react';

const Client = () => {
    const [users, setUsers] = useState([]);

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
        <div>
            <h1>Liste des Clients</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Adresse</th>
                        <th>Ville</th>
                        <th>Code postal</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.address}</td>
                            <td>{user.city}</td>
                            <td>{user.postal_code}</td>
                            <td>
                                {user.profile_image_path && (
                                    <img
                                        src={user.profile_image_path}
                                        alt={user.name}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Client;
