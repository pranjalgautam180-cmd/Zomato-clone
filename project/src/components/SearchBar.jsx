import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ onSearch, large = false }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className={`search-bar ${large ? 'search-bar-large' : ''}`} onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for restaurants, cuisines, or dishes"
          value={query}
          onChange={handleChange}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setQuery('');
              if (onSearch) onSearch('');
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
