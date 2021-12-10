const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/order-service',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>{
  console.log('Order service DB connected')
})