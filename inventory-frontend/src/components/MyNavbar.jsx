import React from 'react';
import { Link } from 'react-router-dom';

function MyNavbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        
        <Link 
            className="navbar-brand" 
            to={user.role === 'SALES_REP' ? "/sales" : "/dashboard"}
        >
            🏢 SysCorp Inventory
        </Link>

        <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
            
            {user.role !== 'SALES_REP' && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">📊 Dashboard</Link>
              </li>
            )}
            <li className="nav-item"><Link className="nav-link" to="/inventory">📦 Inventory</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sales-history">📜 History</Link></li>
            <li className="nav-item"><Link className="nav-link text-warning fw-bold" to="/sales">💰 New Order</Link></li>
            

            {user.role !== 'SALES_REP' && (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        ⚙️ Manage
                    </a>
                    <ul className="dropdown-menu shadow">
                        
                        {user.role === 'ADMIN' && (
                            <>
                                <li><Link className="dropdown-item text-danger fw-bold" to="/users">👥 Staff</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                            </>
                        )}

                        <li><h6 className="dropdown-header">Inventory Setup</h6></li>
                        <li><Link className="dropdown-item" to="/add-category">📂 Add Category</Link></li>
                        <li><Link className="dropdown-item" to="/add-product">➕ Add Product</Link></li>
                        
                        <li><hr className="dropdown-divider" /></li>
                        
                        <li><h6 className="dropdown-header">Supplier Management</h6></li>
                        <li><Link className="dropdown-item" to="/add-supplier">🚛 Add Supplier</Link></li>
                        <li><Link className="dropdown-item" to="/suppliers">🏢 View Suppliers</Link></li>
                    </ul>
                </li>
            )}
          </ul>

          <div className="d-flex align-items-center text-white mt-3 mt-lg-0">
            <span className="me-3">👤 {user.username}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;