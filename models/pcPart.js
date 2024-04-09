import { Mongoose } from "mongoose";

const pcPartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
});

export default mongoose.model('PCPart', pcPartSchema);