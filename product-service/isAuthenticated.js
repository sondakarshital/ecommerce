const jwttoken = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];

  jwttoken.verify(token, 'secret', (err, user) => {
    if (err) return res.json({ message: err });
    req.user = user;
    next();
  });
};
