import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Admin.css';

const Admin = () => {
  const { user } = useCart();

  const isEnvDev = import.meta.env.VITE_IS_DEV === 'true';
  const devEmail = import.meta.env.VITE_DEV_EMAIL;
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const isDeveloper = isEnvDev || isLocal || (user && devEmail && user.email === devEmail);

  if (!isDeveloper) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <p>Developer-only dashboard. Visible because one of these is true:</p>
      <ul>
        <li>Running on localhost</li>
        <li>`VITE_IS_DEV` set to true</li>
        <li>Logged-in user's email matches `VITE_DEV_EMAIL`</li>
      </ul>

      <section className="admin-cards">
        <div className="admin-card">
          <h3>Users</h3>
          <p>Manage users (placeholder)</p>
        </div>
        <div className="admin-card">
          <h3>Orders</h3>
          <p>View recent orders (placeholder)</p>
        </div>
        <div className="admin-card">
          <h3>Restaurants</h3>
          <p>Manage restaurants (placeholder)</p>
        </div>
      </section>
    </div>
  );
};

export default Admin;
