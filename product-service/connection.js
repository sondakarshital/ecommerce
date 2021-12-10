const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/product-service',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Product service DB connected');
  }
);
