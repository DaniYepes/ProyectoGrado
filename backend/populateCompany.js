// backend/populateCompany.js

const { sequelize, Company } = require('./models'); // Importa el modelo de Company desde tu archivo index.js

// Función para poblar la tabla con datos de ejemplo
const populateCompanies = async () => {
  try {
    // Conecta a la base de datos
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');

    // Array de datos a insertar con las compañías proporcionadas
    const companiesData = [
      { name: 'RSV', nit: '0', last_digit: 0 },
      { name: 'PUNTO RESERVE', nit: '0', last_digit: 0 },
      { name: 'Comercio y Asesorias Internacionales SAS', nit: '901035784-5', last_digit: 4 },
      { name: 'Benavides Marin Valencia Abogados Sas', nit: '901251384-8', last_digit: 4 },
      { name: 'Inversiones de Alta Renta - INALTA S A S', nit: '900943065-1', last_digit: 5 },
      { name: 'Oil & Gas Consultant Group', nit: '900515315-0', last_digit: 5 },
      { name: 'dapp colombia', nit: '901644165', last_digit: 5 },
      { name: 'Dacosta Ordoñez Abogados S.A.S', nit: '900490106-8', last_digit: 6 },
      { name: 'U-Colombia Living Condition SAS', nit: '901133346-2', last_digit: 6 },
      { name: 'Fundación Inalta', nit: '901158386-5', last_digit: 5 },
      { name: 'Renova Investments S.A.S.', nit: '900553177-2', last_digit: 7 },
      { name: 'Benavides Morales David Alfonso', nit: '1094882097-0', last_digit: 4 },
      { name: 'Axe International Sucursal Colombia', nit: '900958287-3', last_digit: 7 },
      { name: 'Petroleos Colombianos SA', nit: '900067887-9', last_digit: 7 },
      { name: 'Gesca Corp Colombia S.A.S', nit: '900353258-2', last_digit: 8 },
      { name: 'DP Consultores Integrados SAS', nit: '901037038-8', last_digit: 8 },
      { name: 'Revisores Fiscales Integrales SAS', nit: '901102598-9', last_digit: 8 },
      { name: 'Servimeca Industrial S.A.S', nit: '900331409-3', last_digit: 9 },
      { name: 'Empresa Petrolera EMPETROL SAS', nit: '900368929-1', last_digit: 1 },
      { name: 'Uretek Colombia SAS', nit: '901586429-9', last_digit: 9 },
      { name: 'Activos Finca Raíz Golden S.A.S', nit: '900961930-2', last_digit: 0 },
      { name: 'Azul ZF SAS', nit: '901245830-7', last_digit: 0 }
    ];

    // Inserta cada compañía
    for (const company of companiesData) {
      await Company.create(company);
    }

    console.log('Datos de compañías insertados con éxito.');
  } catch (error) {
    console.error('Error al poblar la tabla de compañías:', error);
  } finally {
    // Cerrar la conexión
    await sequelize.close();
  }
};

// Ejecutar el script
populateCompanies();
