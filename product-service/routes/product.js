const express = require('express');
const isAuthenticated = require('../isAuthenticated');
const router = express.Router();
const Product = require('../Product');
const amqp = require('amqplib');
var channel, connection,order;
async function connect() {
  const ampqserver = 'amqp://localhost:5672';
  connection = await amqp.connect(ampqserver);
  channel = await connection.createChannel();
  await channel.assertQueue('PRODUCT');
}
connect();

router.post('/product/create', isAuthenticated, async (req, res, next) => {
  const { name, description, price } = req.body;
  const product = new Product({
    name,
    description,
    price,
  });

  try {
    const productCreated = await product.save();
    res.json(productCreated);
  } catch (error) {
    res.json({ errorMessage: error });
  }
});

router.post('/product/buy', isAuthenticated, async (req, res, next) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });
  channel.sendToQueue(
    'ORDER',
    Buffer.from(
      JSON.stringify({
        products,
        email: req.user.email,
      })
    )
  );
  channel.consume('PRODUCT',(data)=>{
    order = JSON.parse(data.content);
  })
  res.send(order);
});


module.exports = router;
