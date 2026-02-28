import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Sales() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        api.get('/products')
           .then(res => setProducts(res.data))
           .catch(err => console.error("Error loading products", err));
    }, []);

    useEffect(() => {
        const product = products.find(p => p.id === parseInt(selectedProductId));
        if (product && quantity > 0) {
            setTotalPrice(product.price * quantity);
        } else {
            setTotalPrice(0);
        }
    }, [selectedProductId, quantity, products]);

    const handleSale = (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!selectedProductId || quantity <= 0) {
            setError("Please select a product and valid quantity.");
            return;
        }

        const saleData = {
            productId: selectedProductId,
            userId: user.id,
            quantity: quantity
        };

        api.post('/sales', saleData)
            .then(res => {
                setMessage(`✅ Sale Successful! Total: $${res.data.totalPrice}`);
                setQuantity(1);
                setSelectedProductId('');
            })
            .catch(err => {
                setError("❌ Sale Failed: " + (err.response?.data || "Unknown Error"));
            });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg col-md-8 mx-auto">
                <div className="card-header bg-success text-white">
                    <h4>💰 B2B Sales Terminal</h4>
                </div>
                <div className="card-body">
                    
                    <div className="mb-4 p-3 bg-light border rounded d-flex justify-content-between align-items-center">
                        <span><strong>Sales Rep:</strong> {user ? user.username : 'Loading...'}</span>
                        <span className="badge bg-primary">Active Session</span>
                    </div>

                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSale}>
                        <div className="mb-3">
                            <label className="form-label">Select Product</label>
                            <select 
                                className="form-select form-select-lg" 
                                value={selectedProductId} 
                                onChange={e => setSelectedProductId(e.target.value)}
                                required
                            >
                                <option value="">-- Choose Item --</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id} disabled={p.stockQuantity <= 0}>
                                        {p.name} (Stock: {p.stockQuantity}) - ${p.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label className="form-label">Quantity</label>
                                <input 
                                    type="number" 
                                    className="form-control form-control-lg" 
                                    value={quantity} 
                                    onChange={e => setQuantity(parseInt(e.target.value))}
                                    min="1"
                                    required 
                                />
                            </div>
                            
                            <div className="col-md-6 d-flex align-items-end">
                                <div className="w-100 p-2 bg-warning bg-opacity-25 border border-warning rounded text-center">
                                    <small className="text-muted">Estimated Total</small>
                                    <h3 className="m-0 text-dark">${totalPrice.toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success w-100 py-3 fw-bold shadow-sm">
                            CONFIRM SALE 🚀
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sales;