import { useNavigate } from 'react-router-dom';
import categories from '../data/categories';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/search?q=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="categories-section">
      <h2 className="section-title">What's on your mind?</h2>
      <div className="categories-scroll">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-item"
            onClick={() => handleClick(category.name)}
          >
            <div
              className="category-icon"
              style={{ backgroundColor: category.color + '22' }}
            >
              <span className="category-emoji">{category.icon}</span>
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
