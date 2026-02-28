import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

function CategoryProducts() {
    const { categoryId, categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        api.get(`/products/category/${categoryId}`)
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error loading products", err));
    }, [categoryId]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            api.delete(`/products/${id}`)
                .then(() => {
                    setProducts(products.filter(p => p.id !== id));
                })
                .catch(err => alert("Error deleting product"));
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/inventory')}>
                <FaArrowLeft /> Back to Folders
            </button>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>📂 {categoryName}</h2>

                {user.role !== 'SALES_REP' && (
                    <button className="btn btn-primary" onClick={() => navigate(`/add-product`)}>
                        + Add Item to {categoryName}
                    </button>
                )}
            </div>

            <div className="table-responsive">
                <table className="table table-hover shadow-sm bg-white rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>Product Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Supplier</th>
                            {user.role !== 'SALES_REP' && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td className="fw-bold">{p.name}</td>

                                <td>
                                    <span className={`badge ${p.stockQuantity < 10 ? 'bg-danger' : 'bg-success'}`}>
                                        {p.stockQuantity}
                                    </span>
                                </td>

                                <td>${p.price.toFixed(2)}</td>
                                <td>{p.supplier ? p.supplier.name : 'N/A'}</td>

                                {user.role !== 'SALES_REP' && (
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => navigate(`/edit-product/${p.id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CategoryProducts;