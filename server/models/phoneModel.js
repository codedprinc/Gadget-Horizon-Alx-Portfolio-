import mongoose from "mongoose";

const displaySchema = new mongoose.Schema({
    size: { type: Number, required: true },          // e.g., 6.1
    resolution: { type: String, required: true },    // e.g., '1170x2532'
    type: { type: String, required: true }           // e.g., 'OLED'
}, { _id: false }); // Disable _id for subdocuments if not needed

const cameraSchema = new mongoose.Schema({
    main: { type: String, required: true },           // e.g., '12MP'
    selfie: { type: String, required: true }          // e.g., '12MP'
}, { _id: false });

const specsSchema = new mongoose.Schema({
    display: { type: displaySchema, required: true },
    camera: { type: cameraSchema, required: true },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    battery: { type: String, required: true }
}, { _id: false });

const phoneSchema = new mongoose.Schema({
    brand: { type: String, required: true, index: true },
    series: { type: String, index: true },
    model: { type: String, required: true },
    releaseYear: { type: Number },
    specs: { type: specsSchema, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    images: [{ type: String }]
}, { timestamps: true });

// Create compound index for brand and series
phoneSchema.index({ brand: 1, series: 1 });

export const Phone = mongoose.model('Phones', phoneSchema);
