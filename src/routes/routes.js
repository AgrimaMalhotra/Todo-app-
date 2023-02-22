const routes = require('express');
const router = routes.Router();
const controller = require('../controllers/controller');
const { validTest } = require('../middlewares/validator');
const { validateUserMiddleware } = require('../middlewares/index');

router.route('/tasks')
    // .get(validateUserMiddleware, controller.getAllTasks)
    // .post(validateUserMiddleware, validTest("post"), controller.createTask);
    .get(controller.getAllTasks)
    .post(validTest("post"), controller.createTask);

router.route('/tasks/:id')
    // .get(validateUserMiddleware, validTest("id"), controller.getTask)
    // .put(validateUserMiddleware, validTest("put"), validTest("id"), controller.updateTask)
    // .delete(validateUserMiddleware, validTest("id"), controller.deleteTask)
    // .patch(validateUserMiddleware, validTest("patch"), controller.completeTask);
    .get(validTest("id"), controller.getTask)
    .put( validTest("put"), validTest("id"), controller.updateTask)
    .delete(validTest("id"), controller.deleteTask)
    .patch(validTest("patch"), controller.completeTask);

module.exports = router;
