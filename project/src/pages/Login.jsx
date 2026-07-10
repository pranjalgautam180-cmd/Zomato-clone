import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Login.css';

const Login = () => {
  const { loginUser } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      loginUser({
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) + ' User',
        email: email,
        phone: '+91 98765 43210',
        address: '123 MG Road, Bengaluru, Karnataka 560001',
      });
      setLoading(false);
      navigate('/');
    }, 800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginUser({
        name: 'Google User',
        email: 'user@gmail.com',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bengaluru, Karnataka 560001',
      });
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image-side">
          <div className="auth-image-overlay">
            <h2>Welcome Back!</h2>
            <p>Sign in to order your favorite food from the best restaurants in your city.</p>
          </div>
        </div>
        <div className="auth-form-side">
          <div className="auth-form-container">
            <Link to="/" className="auth-logo">Zomato</Link>
            <h1 className="auth-title">Login</h1>
            <p className="auth-subtitle">Sign in to your account to continue</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="auth-options">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="auth-forgot">Forgot password?</a>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button className="auth-google-btn" onClick={handleGoogleLogin} disabled={loading}>
              <span className="auth-google-icon">G</span>
              Continue with Google
            </button>

            <p className="auth-switch">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
