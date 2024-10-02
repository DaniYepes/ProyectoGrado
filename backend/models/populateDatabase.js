const { User, Company, CompanyAssignment, Process, sequelize } = require('./db');

const populateDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Crear usuarios de ejemplo
    const contador1 = await User.create({ username: 'zquina', email: 'zquina@correo.com', password: '123', role: 'Contador' });
    const contador2 = await User.create({ username: 'dquiza', email: 'dquiza@correo.com', password: '123', role: 'Contador' });
    const coordinador1 = await User.create({ username: 'mbrijaldo', email: 'mbrijaldo@correo.com', password: '123', role: 'Coordinador' });
    const coordinador2 = await User.create({ username: 'dpulido', email: 'dpulido@correo.com', password: '123', role: 'Coordinador' });

    // Crear compañías de ejemplo
    const company1 = await Company.create({ name: 'Psicodrama Produccciones SAS', nit: '900605931-4', last_digit: 1 });
    const company2 = await Company.create({ name: 'Red River Capital Advisors S.A. SC', nit: '900251111-0', last_digit: 1 });

    // Asignar contadores y coordinadores a las compañías
    await CompanyAssignment.create({ company_id: company1.id, user_id: contador1.id, role: 'Contador' });
    await CompanyAssignment.create({ company_id: company1.id, user_id: coordinador1.id, role: 'Coordinador' });
    await CompanyAssignment.create({ company_id: company2.id, user_id: contador2.id, role: 'Contador' });
    await CompanyAssignment.create({ company_id: company2.id, user_id: coordinador2.id, role: 'Coordinador' });

    console.log('Base de datos inicializada con éxito.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
};

// Ejecutar el script de población de datos
populateDatabase();
