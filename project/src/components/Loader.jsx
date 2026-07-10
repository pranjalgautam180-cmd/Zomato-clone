import './Loader.css';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner">
        <div className="loader-plate"></div>
        <div className="loader-plate"></div>
        <div className="loader-plate"></div>
      </div>
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
