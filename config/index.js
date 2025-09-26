import dotenv from 'dotenv';

dotenv.config();
['PORT', 'JWT_SECRET'].forEach((name) => {
  if (Object.keys(process.env).indexOf(name) < 0) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

export const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
