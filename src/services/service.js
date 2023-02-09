const models = require('../database/models');

const getAllTasks = async () => {
  const tasks = models.Tasks.findAll();
  return tasks;
}

const getTask = async (id) => {
  const task = models.Tasks.findOne({
    where: { id: id }
  });
  return task;
}

const createTask = async (taskInfo) => {
  return models.Tasks.create({ task: taskInfo.task });
}

const updateTask = async (id, taskInfo) => {
  if (await models.Tasks.findOne({
    where: { id: id }
  })) {
    await models.Tasks.update(taskInfo, {
      where: { id: id }
    })
    const newTask = await models.Tasks.findOne({
      where: { id: id }
    });
    return newTask;
  }
  await createTask(taskInfo);
}

const deleteTask = async (id) => {
  if (await models.Tasks.findOne({
    where: { id: id }
  })) {
    await models.Tasks.destroy({
      where: { id: id }
    });
    return { message: `Task with id ${id} deleted.` };
  }
  return 0;
}

const completeTask = async (id, taskInfo) => {
  const task = await models.Tasks.findOne({
    where: { id: id }
  });
  if (task) {
    await models.Tasks.update({ isCompleted: taskInfo.isCompleted }, {
      where: { id: id }
    })
    return task;
  }
  return 0;
}


module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask
}