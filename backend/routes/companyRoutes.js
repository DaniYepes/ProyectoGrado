const express = require('express');
const { Company, User, CompanyAssignment } = require('../db');
const router = express.Router();

// Obtener compañías asignadas a un usuario
router.get('/companies/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const companies = await Company.findAll({
      include: {
        model: User,
        through: { where: { user_id: userId } }
      }
    });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las compañías.' });
  }
});

module.exports = router;
