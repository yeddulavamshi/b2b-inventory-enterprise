import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    supplierId: ''
  });

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data));
    api.get('/suppliers').then(res => setSuppliers(res.data));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
        name: product.name.trim(),
        description: product.description,
        price: parseFloat(product.price),
        stockQuantity: parseInt(product.stockQuantity),
        category: { id: parseInt(product.categoryId) },
        supplier: { id: parseInt(product.supplierId) }
    };

    api.post('/products', payload)
      .then(() => {
        alert("Product Added!");
        navigate('/inventory');
      })
      .catch(error => {
        console.error("Error", error);
        if (error.response && error.response.data) {
            alert(error.response.data); 
        } else {
            alert("❌ Failed to save. Please check your network or inputs.");
        }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow col-md-8 mx-auto">
        <div className="card-header bg-primary text-white">
            <h4>📦 Add New Inventory Item</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Price ($)</label>
                    <input type="number" step="0.01" name="price" className="form-control" onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Initial Stock</label>
                    <input type="number" name="stockQuantity" className="form-control" onChange={handleChange} required />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select name="categoryId" className="form-select" onChange={handleChange} required>
                        <option value="">-- Select Category --</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Supplier</label>
                    <select name="supplierId" className="form-select" onChange={handleChange} required>
                        <option value="">-- Select Supplier --</option>
                        {suppliers.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/inventory')}>
                    Back to Inventory
                </button>
                <button type="submit" className="btn btn-success px-4">Save Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;