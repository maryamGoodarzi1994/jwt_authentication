import jwt from 'jsonwebtoken';

import { config } from '../config/index.js';
import logger from '../utils/logger.js';

const authMiddleware = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    logger.warn(
      `Authorization failed: no token provided for request ${req.method} ${req.originalUrl}`
    );
    return res.status(401).json({
      message: 'Authorization token required!',
    });
  }
  token = token.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      logger.warn(
        `Authorization failed: invalid or expired token for request ${req.method} ${req.originalUrl}`
      );
      return res.status(403).json({
        message: 'Invalid or expired token',
      });
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;
