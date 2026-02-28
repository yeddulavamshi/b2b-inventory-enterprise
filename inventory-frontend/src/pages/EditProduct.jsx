import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  
  const [product, setProduct] = useState({
    id: '',
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

    api.get(`/products/${id}`)
       .then(res => {
         const data = res.data;
         setProduct({
            id: data.id,
            name: data.name,
            description: data.description || '',
            price: data.price,
            stockQuantity: data.stockQuantity,
            categoryId: data.category ? data.category.id : '',
            supplierId: data.supplier ? data.supplier.id : ''
         });
       })
       .catch(err => alert("Error loading product"));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
        id: parseInt(product.id),
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        stockQuantity: parseInt(product.stockQuantity),
        category: { id: parseInt(product.categoryId) },
        supplier: { id: parseInt(product.supplierId) }
    };

    api.put('/products', payload) 
      .then(() => {
        alert("Product Updated Successfully!");
        navigate(-1); 
      })
      .catch(error => {
        console.error("Error", error);
        alert("Failed to update product.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow col-md-8 mx-auto">
        <div className="card-header bg-warning text-dark">
            <h4>✏️ Edit Product</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                value={product.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Price ($)</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="price" 
                        className="form-control" 
                        value={product.price} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Stock Quantity</label>
                    <input 
                        type="number" 
                        name="stockQuantity" 
                        className="form-control" 
                        value={product.stockQuantity} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select 
                        name="categoryId" 
                        className="form-select" 
                        value={product.categoryId} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Supplier</label>
                    <select 
                        name="supplierId" 
                        className="form-select" 
                        value={product.supplierId} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">-- Select Supplier --</option>
                        {suppliers.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="btn btn-warning px-4">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;