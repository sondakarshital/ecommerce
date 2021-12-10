const express = require('express');
const router = express.Router();
const User = require('../User');
const jwttoken = require('jsonwebtoken');

router.post('/auth/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send({ message: 'User is not registred' });
  if (user.password != password)
    return res.send({ message: 'Password incorrect' });
  const payload = { email, name: user.name };
  const token = jwttoken.sign(payload, 'secret', (err, token) => {
    if (err) return res.send({ mesaage: 'invalid token' });
    return res.send({ token: token });
  });
});

router.post('/auth/register', async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.send({ message: 'User already exists' });
  } else {
    const userObj = new User({
      name,
      email,
      password,
    });
    try {
      let user = await userObj.save();
      res.json(user);
    } catch (err) {
      res.send({ error: err });
    }
  }
});

module.exports = router;
