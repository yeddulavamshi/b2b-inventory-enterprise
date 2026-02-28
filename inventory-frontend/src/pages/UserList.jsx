import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaTrash, FaEdit } from 'react-icons/fa';

function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'ADMIN') {
            alert("⛔ Access Denied: You do not have permission to view this page.");
            navigate('/dashboard');
        } else {
            loadUsers();
        }
    }, [navigate]);

    const loadUsers = () => {
        api.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error loading users", err));
    };

    const handleDelete = (id, username) => {
        if (window.confirm(`Are you sure you want to remove ${username}?`)) {
            api.delete(`/users/${id}`)
                .then(() => {
                    alert("User Deleted!");
                    loadUsers();
                })
                .catch(err => alert(err.response?.data || "Error deleting user"));
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><FaUsers /> Staff Management</h2>
                <button className="btn btn-primary" onClick={() => navigate('/add-user')}>
                    <FaUserPlus /> Hire New Staff
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td className="fw-bold">{u.username}</td>
                                        <td>
                                            <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' :
                                                u.role === 'MANAGER' ? 'bg-warning text-dark' :
                                                    'bg-info text-dark'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>

                                            {(u.id !== 1 || currentUser.id === 1) && (
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => navigate(`/edit-user/${u.id}`)}
                                                    title="Edit User"
                                                >
                                                    <FaEdit />
                                                </button>
                                            )}

                                            {u.id !== 1 && u.id !== currentUser.id && (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(u.id, u.username)}
                                                    title="Delete User"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;