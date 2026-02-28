import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaShoppingCart, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';

function Dashboard() {
    const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        api.get('/sales')
            .then(res => {
                const sales = res.data;
                const total = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
                setStats({
                    totalRevenue: total,
                    totalOrders: sales.length
                });
            })
            .catch(err => console.error("Error loading sales", err));

        api.get('/products/low-stock')
            .then(res => setLowStockProducts(res.data))
            .catch(err => console.error("Error loading low stock", err));
    };

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <h2>📊 Executive Dashboard</h2>
                <p className="text-muted">Real-time overview of your business.</p>
            </div>

            <div className="row mb-5">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm border-success h-100">
                        <div className="card-body d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                                <FaMoneyBillWave size={30} className="text-success" />
                            </div>
                            <div>
                                <h6 className="text-muted mb-0">Total Revenue</h6>
                                <h2 className="fw-bold text-success">${stats.totalRevenue.toFixed(2)}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm border-primary h-100">
                        <div className="card-body d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <FaShoppingCart size={30} className="text-primary" />
                            </div>
                            <div>
                                <h6 className="text-muted mb-0">Total Orders</h6>
                                <h2 className="fw-bold text-dark">{stats.totalOrders}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow">
                <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                        <FaExclamationTriangle className="me-2" /> 
                        Low Stock Alerts (Below 10)
                    </h5>
                    <button className="btn btn-sm btn-light text-danger fw-bold" onClick={() => navigate('/inventory')}>
                        Manage Inventory <FaArrowRight />
                    </button>
                </div>
                <div className="card-body p-0">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Remaining Stock</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.length > 0 ? lowStockProducts.map(p => (
                                <tr key={p.id}>
                                    <td className="fw-bold">{p.name}</td>
                                    <td className="text-danger fw-bold">{p.stockQuantity}</td>
                                    <td>${p.price.toFixed(2)}</td>
                                    <td><span className="badge bg-danger">Re-Order Now</span></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-success">
                                        ✅ All stock levels are healthy!
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

export default Dashboard;