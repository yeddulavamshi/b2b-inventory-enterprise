import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', role: '', password: '' });

    useEffect(() => {
        api.get(`/users/${id}`)
           .then(res => setUser({ 
               username: res.data.username, 
               role: res.data.role, 
               password: '' 
           }))
           .catch(err => alert("Error loading user"));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        api.put(`/users/${id}`, user)
            .then(() => {
                alert("User Updated Successfully!");
                navigate('/users');
            })
            .catch(err => alert("Failed to update user"));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow col-md-6 mx-auto">
                <div className="card-header bg-warning text-dark">
                    <h4>✏️ Edit Staff Member</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={user.username}
                                onChange={e => setUser({...user, username: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password (Leave blank to keep current)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter new password..."
                                value={user.password}
                                onChange={e => setUser({...user, password: e.target.value})} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select 
                                className="form-select" 
                                value={user.role}
                                onChange={e => setUser({...user, role: e.target.value})}
                            >
                                <option value="SALES_REP">Sales Rep</option>
                                <option value="MANAGER">Manager</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
                                <FaArrowLeft /> Cancel
                            </button>
                            <button className="btn btn-success">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;