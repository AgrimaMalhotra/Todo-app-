const service = require('../services/service');
const HTTPErrors = require('../utils/httpError');


const getAllTasks = async (req, res) => {
    try {
        const tasks = await service.getAllTasks();
        if (tasks === null) {
            throw new HTTPErrors('No entries found', 404);
        }
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        if (err instanceof HTTPErrors) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}
const getTask = async (req, res) => {
    try {
        const task = await service.getTask(req.params.id);
        if (task === null) {
            throw new HTTPErrors("No entry found", 404);
        }
        res.status(200).json(task);
    } catch (err) {
        if (err instanceof HTTPErrors) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}
const createTask = async (req, res) => {
    try {
        const task = await service.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await service.updateTask(req.params.id, req.body);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await service.deleteTask(req.params.id);
        if (task === 0) {
            throw new HTTPErrors("No entry deleted. Entry not found", 404);
        }
        res.status(200).json(task);
    } catch (err) {
        if (err instanceof HTTPErrors) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

const completeTask = async (req, res) => {
    try {
        const task = await service.completeTask(req.params.id, req.body);
        if (task === 0) {
            throw new HTTPErrors("No entry updated. Entry not found", 404);
        }
        res.status(200).json(task);
    } catch (err) {
        if (err instanceof HTTPErrors) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    completeTask
}