// components/Checkout.jsx
import React from 'react'
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
    const { cart, createOrder } = useCart();
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
      paymentMethod: 'credit_card',
      paymentStatus: 'pending',
      transactionId: ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createOrder(shippingAddress, paymentInfo);
        navigate('/order-success');
      } catch (error) {
        console.error('Checkout error:', error);
      }
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Street Address</label>
              <input
                type="text"
                value={shippingAddress.street}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    street: e.target.value
                  })
                }
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  value={shippingAddress.zipCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      zipCode: e.target.value
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Country</label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Payment Method</label>
              <select
                value={paymentInfo.paymentMethod}
                onChange={(e) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    paymentMethod: e.target.value
                  })
                }
                className="w-full border p-2 rounded"
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    );
  };