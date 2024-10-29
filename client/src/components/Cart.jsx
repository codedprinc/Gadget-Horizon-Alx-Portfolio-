// components/Cart.jsx
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div className="text-center py-8">
          <p>Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.phone._id}
                className="flex items-center justify-between border p-4 rounded shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.phone.image}
                    alt={item.phone.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.phone.name}</h3>
                    <p className="text-gray-600">
                      Quantity: {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: ${cart.totalPrice.toFixed(2)}
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};