const express = require('express');
const { createTask, updateTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/tasks', authMiddleware, createTask);
router.put('/tasks/:taskId', authMiddleware, updateTask);

module.exports = router;
