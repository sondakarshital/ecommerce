const express = require('express');
const app = express();
const PORT = process.env.port || 3001;
const mongoose = require('mongoose');
const productRoute = require('./routes/product');
require('./connection');
app.use(express.json())

app.use(productRoute);
app.listen(PORT, () => {
  console.log(`Product service listening on ${PORT} `);
});
