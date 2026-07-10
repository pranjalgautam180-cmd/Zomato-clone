import './Loader.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image shimmer"></div>
      <div className="skeleton-body">
        <div className="skeleton-line shimmer" style={{ width: '60%' }}></div>
        <div className="skeleton-line shimmer" style={{ width: '40%' }}></div>
        <div className="skeleton-line shimmer" style={{ width: '80%' }}></div>
      </div>
    </div>
  );
};

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="restaurant-grid">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
