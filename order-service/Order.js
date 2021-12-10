const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderSchema = new schema({
  products: [{ product_id: String }],
  user: String,
  total_price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
