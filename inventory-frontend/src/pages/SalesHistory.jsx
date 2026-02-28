import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaArrowLeft } from 'react-icons/fa';

function SalesHistory() {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/sales')
            .then(res => {
                const sortedSales = res.data.sort((a, b) => b.id - a.id);
                setSales(sortedSales);
            })
            .catch(err => console.error("Error loading sales", err));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "Just now";
        return new Date(dateString).toLocaleDateString() + " " + new Date(dateString).toLocaleTimeString();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><FaHistory /> Transaction Log</h2>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    <FaArrowLeft /> Back to Dashboard
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Date & Time</th>
                                <th>Product</th>
                                <th>Sold By</th>
                                <th>Qty</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length > 0 ? sales.map(sale => (
                                <tr key={sale.id}>
                                    <td>#{sale.id}</td>
                                    <td>{formatDate(sale.saleDate)}</td>
                                    <td className="fw-bold">{sale.product ? sale.product.name : "Unknown Product"}</td>
                                    <td>
                                        <span className="badge bg-info text-dark">
                                            {sale.user ? sale.user.username : "Unknown"}
                                        </span>
                                    </td>
                                    <td>{sale.quantitySold}</td>
                                    <td className="text-success fw-bold">${sale.totalPrice.toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesHistory;