const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth-service',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>{
  console.log('Auth service DB connected')
})