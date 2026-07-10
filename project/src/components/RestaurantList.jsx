import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';

const RestaurantList = ({ restaurants, loading, skeletonCount = 8 }) => {
  if (loading) {
    return (
      <div className="restaurant-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image shimmer"></div>
            <div className="skeleton-body">
              <div className="skeleton-line shimmer" style={{ width: '60%' }}></div>
              <div className="skeleton-line shimmer" style={{ width: '40%' }}></div>
              <div className="skeleton-line shimmer" style={{ width: '80%' }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="restaurant-list-empty">
        <div className="empty-icon">🍽️</div>
        <h3>No restaurants found</h3>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="restaurant-grid">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
