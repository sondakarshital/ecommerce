const express = require('express');
const app = express();
const PORT = process.env.port || 3002;
const amqp = require('amqplib');
const Order = require('./Order');
require('./connection');
var channel, connection, order;

async function connect() {
  const amqpServer = 'amqp://localhost:5672';
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue('PRODUCT');
}

function createOrder(products, userEmail) {
  let total = 0;
  for (let t = 0; t < products.length; ++t) {
    total += products[t].price;
  }
  const newOrder = new Order({
    products,
    user: userEmail,
    total_price: total,
  });
  newOrder.save();
  return newOrder;
}
connect().then(() => {
  channel.consume('ORDER', (data) => {
    console.log("Consuming ORDER service");
    const { products, email } = JSON.parse(data.content);
    const order = createOrder(products, email);
    channel.ack(data);
    channel.sendToQueue('PRODUCT', Buffer.from(JSON.stringify(order)));
  });
});
app.listen(PORT, () => {
  console.log(`Order service listening on ${PORT} `);
});
