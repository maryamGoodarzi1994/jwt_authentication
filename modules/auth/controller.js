import service from './service.js';

const register = async (req, res) => {
  const { username, password } = req.body;
  
  const result = await service.register(username, password);
  
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  
  return res.json({ user: result.user });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  
  const result = await service.login(username, password);

  if (result.error) {
    return res.status(result.error === 'Invalid credentials' ? 400 : 404).json({ message: result.error });
  }

  return res.json({ message: result.message, token: result.token });
};

const profile = (req, res) => {
  const { username } = req.user;
  
  const result = service.profile(username);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  return res.json({ username: result.username });
};

export { register, login, profile };
