import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function EditSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({ id: '', name: '', contactEmail: '', phoneNumber: '' });

    useEffect(() => {
        api.get(`/suppliers/${id}`)
            .then(res => setSupplier(res.data))
            .catch(err => alert("Error loading supplier"));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put('/suppliers', supplier)
            .then(() => {
                alert("Supplier Updated!");
                navigate('/suppliers');
            })
            .catch(err => alert("Error updating supplier"));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow col-md-6 mx-auto">
                <div className="card-header bg-warning text-dark">
                    <h4>Edit Supplier</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Company Name</label>
                            <input 
                                className="form-control" 
                                value={supplier.name} 
                                onChange={e => setSupplier({...supplier, name: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label>Contact Email</label>
                            <input 
                                className="form-control" 
                                value={supplier.contactEmail} 
                                onChange={e => setSupplier({...supplier, contactEmail: e.target.value})} 
                            />
                        </div>
                        <div className="mb-3">
                            <label>Phone Number</label>
                            <input 
                                className="form-control" 
                                value={supplier.phoneNumber} 
                                onChange={e => setSupplier({...supplier, phoneNumber: e.target.value})} 
                            />
                        </div>
                        <button className="btn btn-warning w-100">Update Supplier</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditSupplier;