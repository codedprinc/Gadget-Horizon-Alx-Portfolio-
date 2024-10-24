import mongoose from "mongoose";

// Schema for individual items in an order
const orderItemSchema = new mongoose.Schema({
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
}, { _id: false }); // Disable _id for subdocuments to avoid unnecessary ObjectIds

// Main order schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    paymentInfo: {
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'debit_card', 'paypal'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },
        transactionId: String
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add index for faster queries
orderSchema.index({ user: 1, createdAt: -1 });

// Virtual populate to get user details when needed
orderSchema.virtual('userDetails', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true
});

// Method to calculate total price
orderSchema.methods.calculateTotalPrice = function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Pre-save hook to update total price
orderSchema.pre('save', async function(next) {
    if (this.isModified('items')) {
        this.totalPrice = this.calculateTotalPrice();
    }
    next();
});

export const Order = mongoose.model('Order', orderSchema);