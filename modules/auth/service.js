import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../../data/user.js';
import { config } from '../../config/index.js';
import logger from '../../utils/logger.js';

const register = async (username, password) => {
  if (users.find((user) => user.username === username)) {
    return { error: 'Username already exists' };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return { user };
};

const login = async (username, password) => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    logger.warn(`Login failed: user ${username} not found`);
    return { error: 'User not found' };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.warn(`Login failed: user ${username} not found`);
    return { error: 'Invalid credentials' };
  }
  logger.info(`Login successful for user ${username}`);
  const token = jwt.sign(
    { username: user.username },
    config.jwtSecret,
    { expiresIn: '1h' }
  );
  return { token, message: 'Login successful' };
};

const profile = (username) => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return { error: 'User not found' };
  }
  return { username: user.username };
};

export default { register, login, profile };
