import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">Zomato</h3>
          <p className="footer-tagline">
            Discover the best food & drinks in your city. Order from your
            favorite restaurants with just a few clicks.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="footer-social-icon">f</a>
            <a href="#" aria-label="Twitter" className="footer-social-icon">𝕏</a>
            <a href="#" aria-label="Instagram" className="footer-social-icon">📷</a>
            <a href="#" aria-label="YouTube" className="footer-social-icon">▶</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/">About Us</Link></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Culture</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-links">
            <li><a href="#">Help & Support</a></li>
            <li><a href="#">Partner with us</a></li>
            <li><a href="#">Ride with us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Download App</h4>
          <div className="footer-app-buttons">
            <a href="#" className="footer-app-btn">
              <span className="footer-app-icon">🍎</span>
              <div>
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>
            <a href="#" className="footer-app-btn">
              <span className="footer-app-icon">▶</span>
              <div>
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Zomato Clone. Built with React. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
