import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import restaurants from '../data/restaurants';
import FoodItem from '../components/FoodItem';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [filterVeg, setFilterVeg] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const { isWishlisted, toggleWishlist } = useCart();

  const restaurant = restaurants.find((r) => r.id === parseInt(id));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const filteredMenu = useMemo(() => {
    if (!restaurant) return [];
    let menu = [...restaurant.menu];

    if (filterVeg) {
      menu = menu.filter((item) => item.veg);
    }

    switch (sortBy) {
      case 'rating':
        menu.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceLow':
        menu.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        menu.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return menu;
  }, [restaurant, filterVeg, sortBy]);

  if (loading) {
    return (
      <div className="restaurant-details-page">
        <Loader text="Loading restaurant..." />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-details-page">
        <div className="restaurant-not-found">
          <h2>Restaurant not found</h2>
          <Link to="/" className="back-home-btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  const wished = isWishlisted(restaurant.id);

  return (
    <div className="restaurant-details-page">
      <div className="restaurant-details-banner">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-details-banner-overlay"></div>
      </div>

      <div className="restaurant-details-content">
        <div className="restaurant-details-header">
          <div className="restaurant-details-info">
            <h1 className="restaurant-details-name">{restaurant.name}</h1>
            <p className="restaurant-details-cuisine">
              {restaurant.cuisine.join(', ')}
            </p>
            <div className="restaurant-details-meta">
              <div className="restaurant-details-meta-item">
                <Rating rating={restaurant.rating} />
                <span>Rating</span>
              </div>
              <div className="restaurant-details-meta-item">
                <span className="meta-value">🕐 {restaurant.deliveryTime} min</span>
                <span>Delivery Time</span>
              </div>
              <div className="restaurant-details-meta-item">
                <span className="meta-value">📍 {restaurant.distance} km</span>
                <span>Distance</span>
              </div>
              <div className="restaurant-details-meta-item">
                <span className="meta-value">₹{restaurant.priceForTwo}</span>
                <span>For Two</span>
              </div>
            </div>
          </div>
          <div className="restaurant-details-actions">
            <div className="restaurant-details-offer">
              <span className="offer-icon">%</span>
              <div>
                <strong>{restaurant.offer}</strong>
                <p>Use code ZOMATO</p>
              </div>
            </div>
            <button
              className={`restaurant-details-wishlist ${wished ? 'wished' : ''}`}
              onClick={() => toggleWishlist(restaurant.id)}
            >
              {wished ? '❤ Wishlisted' : '♡ Add to Wishlist'}
            </button>
          </div>
        </div>

        <div className="restaurant-menu-controls">
          <h2 className="menu-title">Menu</h2>
          <div className="menu-filters">
            <label className="menu-filter-checkbox">
              <input
                type="checkbox"
                checked={filterVeg}
                onChange={(e) => setFilterVeg(e.target.checked)}
              />
              <span className="filter-label">Veg Only</span>
            </label>
            <div className="menu-sort">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="relevance">Sort: Relevance</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="priceLow">Price (Low to High)</option>
                <option value="priceHigh">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="restaurant-menu-list">
          {filteredMenu.length === 0 ? (
            <div className="menu-empty">
              <p>No items match your filter.</p>
            </div>
          ) : (
            filteredMenu.map((item) => (
              <FoodItem key={item.id} item={item} restaurant={restaurant} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
