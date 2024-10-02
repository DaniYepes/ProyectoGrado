const bcrypt = require('bcrypt');
const User = require('./User'); // El modelo de usuario
const sequelize = require('./db');

async function seedUsers() {
  await sequelize.sync({ force: true }); // O { alter: true } si no quieres perder datos actuales

  const users = [
    {
      email: 'jdbarrios@unbosque.edu.co',
      username: 'jdbarrios',
      password: await bcrypt.hash('123', 10),
      role: 'Gerente',
    },
    {
      email: 'dayepesg@unbosque.edu.co',
      username: 'dayepesg',
      password: await bcrypt.hash('123', 10),
      role: 'Coordinador',
    },
    {
      email: 'jsvallejo@unbosque.edu.co',
      username: 'jsvallejo',
      password: await bcrypt.hash('123', 10),
      role: 'Contador',
    },
  ];

  await User.bulkCreate(users);
  console.log('Usuarios predefinidos creados');
}

seedUsers().then(() => process.exit());