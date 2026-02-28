import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login({ setUrlUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        api.post('/users/login', { username, password })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUrlUser(res.data);
                navigate('/'); 
            })
            .catch(err => {
                setError("Invalid Credentials");
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h3 className="text-center">🔐 Login</h3>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Username</label>
                        <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary w-100">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;