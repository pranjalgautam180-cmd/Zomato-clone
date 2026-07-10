import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Orders.css';

const Orders = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>When you place an order, it will appear here.</p>
          <Link to="/" className="orders-empty-btn">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">Your Orders</h1>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-restaurant-info">
                  <h3 className="order-restaurant-name">{order.restaurantName}</h3>
                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.restaurantId}`} className="order-item">
                    <span className={`order-veg-indicator ${item.veg ? 'veg' : 'non-veg'}`}>
                      <span className="order-veg-dot"></span>
                    </span>
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">×{item.quantity}</span>
                    <span className="order-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-card-footer">
                <div className="order-total">
                  <span>Total Amount</span>
                  <strong>₹{order.total}</strong>
                </div>
                <Link to="/" className="order-reorder-btn">Reorder</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
