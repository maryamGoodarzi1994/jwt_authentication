import { logs } from '../data/log.js';

const addActivityLog = (entry) => {
  logs.push(entry);
  return entry;
};

const activityLogger = (event) => {
  return (req, res, next) => {
    try {
      addActivityLog({
        userId: req.user?.id || 'anonymous',
        event,
        at: new Date().toISOString(),
        ip: req.ip,
        ua: req.get('user-agent'),
        path: req.originalUrl,
        method: req.method,
      });
    } catch (e) {
      console.error('Activity log failed:', e.message);
    }
    console.log(logs);

    next();
  };
};

export default activityLogger;
