// backend/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: '0a2701c4037f25f4ac79e7466f73d701f9629b3f08ab9cb53fee5ac9fa71fc257ca63ff5ead961a3932bee1e009f22adafbba8b26fee8eace0ac07e166f213b2',
  EMAIL_USER: 'jdbarrios@unbosque.edu.co',  // Configura tu cuenta de correo
  EMAIL_PASS: 'Jesus.00.',       // Configura tu contraseña de correo
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: './database_test.sqlite'
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  }
};
