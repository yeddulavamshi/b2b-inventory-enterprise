import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/categories', { name })
            .then(() => {
                alert("Category Created!");
                navigate('/inventory');
            })
            .catch(err => alert("Error adding category. It might already exist."));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow col-md-6 mx-auto">
                <div className="card-header bg-dark text-white">
                    <h4>Create New Category</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Laptops, Furniture"
                                required 
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/inventory')}>
                                Back to Inventory
                            </button>
                            <button className="btn btn-success">Save Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;