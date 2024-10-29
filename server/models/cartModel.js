import mongoose from "mongoose";
// const CartItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1
//   },
//   price: {
//     type: Number,
//     required: true
//   }
// });

// const CartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [CartItemSchema],
//   total: {
//     type: Number,
//     default: 0
//   }
// }, {
//   timestamps: true
// });


const CartItemSchema = new mongoose.Schema({
  phone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phones',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [CartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
export const Cart = mongoose.model('Cart', CartSchema);