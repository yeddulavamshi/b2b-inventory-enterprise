import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaFolder } from 'react-icons/fa';

function Inventory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));

  const loadCategories = () => {
    api.get('/categories')
       .then(res => setCategories(res.data))
       .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(window.confirm("Delete this Category? (Products will become Uncategorized)")) {
        api.delete(`/categories/${id}`).then(() => loadCategories());
    }
  };

  const handleEdit = (e, category) => {
    e.stopPropagation();
    const newName = window.prompt("Enter new Category Name:", category.name);
    if(newName && newName !== category.name) {
        api.put(`/categories/${category.id}`, { name: newName })
           .then(() => loadCategories())
           .catch(err => alert("Error updating name"));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📂 Inventory Categories</h2>
        
        {user.role !== 'SALES_REP' && (
            <button className="btn btn-success" onClick={() => navigate('/add-category')}>
              + New Category
            </button>
        )}
      </div>

      <div className="row">
        {categories.map(c => (
          <div className="col-md-4 mb-4" key={c.id}>
            <div 
                className="card shadow-sm h-100 p-3"
                style={{cursor: 'pointer', border: '1px solid #eee'}}
                onClick={() => navigate(`/inventory/category/${c.id}/${c.name}`)}
            >
              <div className="card-body text-center">
                <FaFolder size={50} className="text-warning mb-3" />
                <h4 className="card-title">{c.name}</h4>
                <p className="text-muted small">Click to view items</p>
                
                {user.role !== 'SALES_REP' && (
                    <div className="mt-3 border-top pt-3">
                        <button 
                            className="btn btn-light btn-sm me-2 text-primary" 
                            title="Rename"
                            onClick={(e) => handleEdit(e, c)}
                        >
                            <FaEdit />
                        </button>
                        <button 
                            className="btn btn-light btn-sm text-danger" 
                            title="Delete"
                            onClick={(e) => handleDelete(e, c.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;