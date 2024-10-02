// backend/controllers/taskController.js

const { Task } = require('../models'); // Importa solo `Task`

exports.createTask = async (req, res) => {
  const { title, description, accountantId, deadline } = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      accountantId,
      coordinatorId: req.user.id,
      deadline,
    });

    res.json({ message: 'Tarea creada', newTask });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { status, comments } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    task.status = status;
    if (comments) task.comments = comments;

    await task.save();
    res.json({ message: 'Tarea actualizada', task });
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};
