const routes = require('express');
const router = routes.Router();
const controller = require('../controllers/controller');
const { validTest } = require('../middlewares/validator');
const { validateUserMiddleware } = require('../middlewares/index');

router.route('/tasks')
    .get(validateUserMiddleware, controller.getAllTasks)
    .post(validateUserMiddleware, validTest("post"), controller.createTask);

router.route('/task/:id')
    .get(validateUserMiddleware, validTest("id"), controller.getTask)
    .put(validateUserMiddleware, validTest("put"), validTest("id"), controller.updateTask)
    .delete(validateUserMiddleware, validTest("id"), controller.deleteTask)
    .patch(validateUserMiddleware, validTest("patch"), controller.completeTask);

module.exports = router;
