import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: false,
  },
  image: {
    data: {
      type: Buffer,
      required: false,
    },
    contentType: {
      type: String,
      required: false,
    },
  },
}, { timestamps: true });

export default mongoose.model('products', ProductSchema);