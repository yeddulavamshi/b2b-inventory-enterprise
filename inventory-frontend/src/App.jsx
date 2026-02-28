import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import api from './api';
import Login from './pages/Login';
import MyNavbar from './components/MyNavbar';
import Dashboard from './pages/Dashboard';

import Inventory from './pages/Inventory';
import CategoryProducts from './pages/CategoryProducts';
import AddCategory from './pages/AddCategory';

import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AddSupplier from './pages/AddSupplier';
import SupplierList from './pages/SupplierList';
import EditSupplier from './pages/EditSupplier';
import Sales from './pages/Sales';
import SalesHistory from './pages/SalesHistory';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      {user && <MyNavbar user={user} onLogout={handleLogout} />}
      <div className={user ? "container" : ""}>
        <Routes>
          {!user ? (
            <Route path="*" element={<Login setUrlUser={setUser} />} />
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />

              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/category/:categoryId/:categoryName" element={<CategoryProducts />} />
              <Route path="/add-category" element={<AddCategory />} />

              
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />

              <Route path="/suppliers" element={<SupplierList />} />
              <Route path="/add-supplier" element={<AddSupplier />} />
              <Route path="/edit-supplier/:id" element={<EditSupplier />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales-history" element={<SalesHistory />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;