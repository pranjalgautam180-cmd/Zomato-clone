import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Profile.css';

const Profile = () => {
  const { user, logoutUser, orders, wishlist } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-not-logged-in">
          <div className="profile-icon">👤</div>
          <h2>You're not logged in</h2>
          <p>Please log in to view your profile.</p>
          <Link to="/login" className="profile-login-btn">Login</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <strong>{orders.length}</strong>
              <span>Orders</span>
            </div>
            <div className="profile-stat">
              <strong>{wishlist.length}</strong>
              <span>Favorites</span>
            </div>
          </div>
          <button className="profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-main">
          <div className="profile-section">
            <h3 className="profile-section-title">Personal Information</h3>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>
              <div className="profile-info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="profile-info-item">
                <label>Phone</label>
                <p>{user.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Saved Addresses</h3>
            <div className="profile-address-card">
              <div className="profile-address-type">Home</div>
              <p>{user.address || '123 MG Road, Bengaluru, Karnataka 560001'}</p>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Recent Orders</h3>
            {orders.length === 0 ? (
              <div className="profile-no-orders">
                <p>No orders yet.</p>
                <Link to="/" className="profile-order-btn">Order Now</Link>
              </div>
            ) : (
              <div className="profile-orders-list">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="profile-order-item">
                    <div className="profile-order-info">
                      <h4>{order.restaurantName}</h4>
                      <p>{order.items.length} items · ₹{order.total}</p>
                      <small>{new Date(order.date).toLocaleDateString()}</small>
                    </div>
                    <span className="profile-order-status">{order.status}</span>
                  </div>
                ))}
                <Link to="/orders" className="profile-view-all">View All Orders →</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
