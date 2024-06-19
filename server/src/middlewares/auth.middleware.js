import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();


const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;