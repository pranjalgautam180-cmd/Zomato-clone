import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = useCallback((item, restaurant) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.restaurantId === restaurant.id
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.restaurantId === restaurant.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          veg: item.veg,
          rating: item.rating,
          quantity: 1,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId, restaurantId) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => !(i.id === itemId && i.restaurantId === restaurantId)
      )
    );
  }, []);

  const increaseQuantity = useCallback((itemId, restaurantId) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === itemId && i.restaurantId === restaurantId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  }, []);

  const decreaseQuantity = useCallback((itemId, restaurantId) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === itemId && i.restaurantId === restaurantId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleWishlist = useCallback((restaurantId) => {
    setWishlist((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  }, []);

  const isWishlisted = useCallback(
    (restaurantId) => wishlist.includes(restaurantId),
    [wishlist]
  );

  const placeOrder = useCallback((orderData) => {
    const order = {
      ...orderData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Delivered',
    };
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  }, []);

  const loginUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartTotal,
    wishlist,
    toggleWishlist,
    isWishlisted,
    orders,
    placeOrder,
    user,
    loginUser,
    logoutUser,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
