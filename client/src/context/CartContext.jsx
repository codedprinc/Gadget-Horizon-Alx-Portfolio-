// context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (phoneId, quantity, price) => {
    try {
      const response = await axios.post('/api/cart/add', {
        phoneId,
        quantity,
        price
      });
      setCart(response.data);
    } catch (error) {
      throw new Error('Failed to add item to cart');
    }
  };

  const createOrder = async (shippingAddress, paymentInfo) => {
    try {
      await axios.post('/api/orders', {
        items: cart.items,
        totalPrice: cart.totalPrice,
        shippingAddress,
        paymentInfo
      });
      setCart({ items: [], totalPrice: 0 });
    } catch (error) {
      throw new Error('Failed to create order');
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    createOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
