import { useLocation, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProtectRoutes = ({ children }) => {
  const { user } = useCart();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectRoutes;
