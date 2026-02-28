import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = () => {
        api.get('/suppliers')
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Error loading suppliers", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure? This might break products linked to this supplier.")) {
            api.delete(`/suppliers/${id}`)
                .then(() => {
                    alert("Supplier Deleted");
                    loadSuppliers();
                })
                .catch(err => alert("Error deleting. Supplier might be in use."));
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>🚛 Supplier Management</h2>
                <button className="btn btn-success" onClick={() => navigate('/add-supplier')}>
                    + Add New Supplier
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map(s => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td className="fw-bold">{s.name}</td>
                                    <td>{s.contactEmail || 'N/A'}</td>
                                    <td>{s.phoneNumber || 'N/A'}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-warning me-2"
                                            onClick={() => navigate(`/edit-supplier/${s.id}`)}
                                            title='Edit'
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(s.id)}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SupplierList;