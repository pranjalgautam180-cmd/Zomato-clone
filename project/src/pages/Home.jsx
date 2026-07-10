import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import OfferBanner from '../components/OfferBanner';
import RestaurantList from '../components/RestaurantList';
import restaurants from '../data/restaurants';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.some((c) => c.toLowerCase().includes(q)) ||
          r.menu.some((m) => m.name.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        result.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'costLow':
        result.sort((a, b) => a.priceForTwo - b.priceForTwo);
        break;
      case 'costHigh':
        result.sort((a, b) => b.priceForTwo - a.priceForTwo);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, sortBy]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const collections = [
    { id: 1, title: 'Trending This Week', count: 30, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Best of Bengaluru', count: 25, image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Newly Opened', count: 18, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, title: 'Hidden Gems', count: 12, image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  return (
    <div className="home-page">
      <Hero onSearch={setSearchQuery} />

      <div className="home-content">
        <Categories />

        <OfferBanner />

        <section className="collections-section">
          <h2 className="section-title">Collections</h2>
          <p className="section-subtitle">
            Explore curated lists of top restaurants, cafes, pubs, and bars in
            your city
          </p>
          <div className="collections-grid">
            {collections.map((collection) => (
              <div key={collection.id} className="collection-card">
                <img src={collection.image} alt={collection.title} loading="lazy" />
                <div className="collection-overlay">
                  <h3>{collection.title}</h3>
                  <p>{collection.count} Places →</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="popular-section">
          <div className="popular-header">
            <h2 className="section-title">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : 'Popular Restaurants'}
            </h2>
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="deliveryTime">Delivery Time (Low to High)</option>
                <option value="costLow">Cost (Low to High)</option>
                <option value="costHigh">Cost (High to Low)</option>
              </select>
            </div>
          </div>
          <RestaurantList
            restaurants={visibleRestaurants}
            loading={loading}
            skeletonCount={8}
          />
          {visibleCount < filteredRestaurants.length && !loading && (
            <div className="load-more-wrapper">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More Restaurants
              </button>
            </div>
          )}
        </section>

        <section className="download-section">
          <div className="download-content">
            <h2>Get the Zomato app</h2>
            <p>
              Order food, track your delivery, and get exclusive offers right
              from your phone. Download the app now!
            </p>
            <div className="download-buttons">
              <a href="#" className="download-btn">
                <span>🍎</span>
                <div>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="download-btn">
                <span>▶</span>
                <div>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
          <div className="download-image">
            <img
              src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="App preview"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
