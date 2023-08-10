const jwt = require('jsonwebtoken');

const secret = 'super secret';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // token can be sent via body query or header
    let token = req.body.token || req.query.token || req.headers.authorization;
    // Splits the token into an array and returns the actual token
    if (req.headers.authorization) {
      token = token.replace('Bearer', '').trim();
    }

    if (!token) {
      return req;
    }

    // verify the token
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (err) {
      console.error(err);
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
