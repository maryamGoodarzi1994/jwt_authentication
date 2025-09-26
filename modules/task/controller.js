import service from './service.js';

const create = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required!',
    });
  }

  const newTask = service.create(title, description);
  res.status(201).json(newTask);
};

const inquiry = (req, res) => {
  const tasks = service.inquiry();
  res.json(tasks);
};

const find = (req, res) => {
  const { id } = req.params;
  const task = service.find(id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found',
    });
  }
  res.json(task);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const task = service.update(id, title, description);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found',
    });
  }

  res.json(task);
};

const remove = (req, res) => {
  const { id } = req.params;

  const deletedTask = service.remove(id);

  if (!deletedTask) {
    return res.status(404).json({
      message: 'Task not found',
    });
  }

  res.json(deletedTask);
};

export { create, inquiry, find, update, remove };
