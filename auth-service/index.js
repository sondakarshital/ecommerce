const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
require('./connection');
app.use(express.json())

app.use(authRoute);
app.listen(PORT, () => {
  console.log(`Auth service listening on ${PORT} `);
});
