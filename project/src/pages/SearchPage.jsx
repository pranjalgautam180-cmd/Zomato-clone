import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import RestaurantList from '../components/RestaurantList';
import SearchBar from '../components/SearchBar';
import restaurants from '../data/restaurants';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterOffers, setFilterOffers] = useState(false);
  const [filterFastDelivery, setFilterFastDelivery] = useState(false);

  useEffect(() => {
    setSearchQuery(queryParam);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [queryParam]);

  const filteredResults = useMemo(() => {
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

    if (filterVeg) {
      result = result.filter((r) => r.menu.some((m) => m.veg));
    }
    if (filterOffers) {
      result = result.filter((r) => r.offer);
    }
    if (filterFastDelivery) {
      result = result.filter((r) => r.deliveryTime <= 30);
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
  }, [searchQuery, sortBy, filterVeg, filterOffers, filterFastDelivery]);

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h1 className="search-page-title">
          {searchQuery ? `Results for "${searchQuery}"` : 'Search Restaurants'}
        </h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="search-page-body">
        <div className="search-filters">
          <h3 className="filter-title">Filters</h3>
          <div className="filter-group">
            <h4>Sort By</h4>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="deliveryTime">Delivery Time (Low to High)</option>
              <option value="costLow">Cost (Low to High)</option>
              <option value="costHigh">Cost (High to Low)</option>
            </select>
          </div>
          <div className="filter-group">
            <h4>Filters</h4>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filterVeg}
                onChange={(e) => setFilterVeg(e.target.checked)}
              />
              <span>Veg Only</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filterOffers}
                onChange={(e) => setFilterOffers(e.target.checked)}
              />
              <span>Has Offers</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filterFastDelivery}
                onChange={(e) => setFilterFastDelivery(e.target.checked)}
              />
              <span>Fast Delivery (≤30 min)</span>
            </label>
          </div>
        </div>

        <div className="search-results">
          <p className="results-count">
            {filteredResults.length} restaurant{filteredResults.length !== 1 ? 's' : ''} found
          </p>
          <RestaurantList restaurants={filteredResults} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
