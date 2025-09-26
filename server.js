import app from './app.js';
import { config } from './config/index.js';

app.listen(Number(config.port), (err) => {
  console.log(`Sever running on port ${config.port}`);
});
