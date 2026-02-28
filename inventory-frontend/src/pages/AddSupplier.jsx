import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AddSupplier() {
    const [supplier, setSupplier] = useState({ name: '', contactEmail: '', phoneNumber: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/suppliers', supplier)
            .then(() => {
                alert("Supplier Added Successfully!");
                navigate('/suppliers');
            })
            .catch(err => alert("Error adding supplier"));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow col-md-6 mx-auto">
                <div className="card-header bg-dark text-white">
                    <h4>🚛 Add New Supplier</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Company Name</label>
                            <input type="text" className="form-control" onChange={e => setSupplier({...supplier, name: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contact Email</label>
                            <input type="email" className="form-control" onChange={e => setSupplier({...supplier, contactEmail: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control" onChange={e => setSupplier({...supplier, phoneNumber: e.target.value})} />
                        </div>
                        
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/suppliers')}>
                                Back to List
                            </button>
                            <button className="btn btn-primary">Save Supplier</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSupplier;