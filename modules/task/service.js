import tasks from '../../data/task.js';

let currentId = 1;

const create = (title, description) => {
  const newTask = { id: currentId++, title, description };
  tasks.push(newTask);
  return newTask;
};

const inquiry = () => {
  return tasks;
};

const find = (id) => {
  return tasks.find((task) => task.id === Number(id));
};

const update = (id, title, description) => {
  const task = tasks.find((task) => task.id === Number(id));
  if (task) {
    if (title) task.title = title;
    if (description) task.description = description;
  }
  return task;
};

const remove = (id) => {
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index !== -1) {
    return tasks.splice(index, 1)[0];
  }
  return null;
};

export default { create, inquiry, find, update, remove };
