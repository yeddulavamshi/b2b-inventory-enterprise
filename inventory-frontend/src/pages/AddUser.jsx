import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '', role: 'SALES_REP' });

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/users/register', user)
            .then(() => {
                alert("✅ New Staff Member Hired!");
                navigate('/users');
            })
            .catch(err => alert("❌ Error: Username might already exist."));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow col-md-6 mx-auto">
                <div className="card-header bg-primary text-white">
                    <h4>👤 Hire New Staff</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={e => setUser({...user, username: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Create a temporary password"
                                onChange={e => setUser({...user, password: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role (Permission Level)</label>
                            <select 
                                className="form-select" 
                                value={user.role}
                                onChange={e => setUser({...user, role: e.target.value})}
                            >
                                <option value="SALES_REP">Sales Rep (Can only sell)</option>
                                <option value="MANAGER">Manager (Can edit stock)</option>
                                <option value="ADMIN">Admin (Full Control)</option>
                            </select>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
                                <FaArrowLeft /> Back
                            </button>
                            <button className="btn btn-success">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddUser;