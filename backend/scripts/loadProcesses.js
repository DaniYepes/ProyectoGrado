const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');

// Conectar a la base de datos
const db = new sqlite3.Database('../database.sqlite');

// Eliminar la tabla si existe y crearla con las nuevas columnas
db.serialize(() => {
  // Eliminar la tabla si existe
  db.run("DROP TABLE IF EXISTS Processes", (err) => {
    if (err) {
      return console.error('Error al eliminar la tabla:', err.message);
    }
    console.log("Tabla Processes eliminada (si existía).");

    // Crear la tabla con las nuevas columnas
    db.run(`CREATE TABLE Processes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Compania VARCHAR(255) NOT NULL,
      Nit VARCHAR(255) NOT NULL,
      UltimoDigito VARCHAR(255),
      Contador VARCHAR(255) NOT NULL,
      Coordinador VARCHAR(255) NOT NULL,
      FechaCreacion DATETIME NOT NULL,
      FechaActualizacion DATETIME NOT NULL,
      Estado VARCHAR(255) NOT NULL
    )`, (err) => {
      if (err) {
        return console.error('Error al crear la tabla:', err.message);
      }
      console.log("Tabla Processes creada con éxito.");

      // Insertar los nuevos registros
      const insertStmt = db.prepare(`INSERT INTO Processes 
        (Compania, Nit, UltimoDigito, Contador, Coordinador, FechaCreacion, FechaActualizacion, Estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

      const records = [
        ['Benavides Marin Valencia Abogados SAS', '901251384-8', '4', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Dacosta Ordoñez Abogados S.A.S', '900490106-8', '6', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Axe international SAS', '900958287-3', '7', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Benavides Morales David Alfonso', '1094882097-0', '7', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['DP Consultores Integrados SAS', '901037038-8', '8', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Azul ZF SAS', '901245830-7', '0', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['MAG Efficient Accountants SAS', '900689021-7', '1', 'Daniel Arevalo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Petroleos Colombianos SAS', '900067887-9', '7', 'Roberto Castellar', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Rubazul Colombia SAS', '901024591-3', '1', 'Sindy Acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Azul Energy SAS', '900916862-9', '2', 'Sindy Acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['U-Colombia Living Condition SAS', '901133346-2', '6', 'Sindy Acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Gesca Corp Colombia S.A.S', '900353258-2', '8', 'Sindy Acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Oil & Gas Consultant Group', '900515315-0', '5', 'Sindy Acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Revisores Fiscales Integrales SAS', '901102598-9', '8', 'Diana Pulido', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Servimeca Industrial S.A.S', '900331409-3', '9', 'Edna Gonzalez', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Julali SAS', '901486795-0', '5', 'Angy y Marcela-sindy acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Anemona SAS', '900569618-9', '8', 'Angy y Marcela-sindy acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Belleza, Salud y tecnologia SAS', '901604192-7', '2', 'Angy y Marcela-sindy acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Felipe Amaya cirugia Plastica SAS', '900814988-1', '8', 'Angy y Marcela-sindy acevedo', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Inversiones de Alta Renta - INALTA S A S', '900943065-1', '5', 'Leidy Nieto', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo'],
        ['Shale Investments S.A.S', '900490432-4', '2', 'Leidy Nieto', 'Diana Pulido', new Date().toISOString(), new Date().toISOString(), 'Activo']
      ];

      // Insertar cada registro
      for (const record of records) {
        insertStmt.run(record, (err) => {
          if (err) {
            return console.error('Error al insertar registro:', err.message);
          }
          console.log('Registro insertado correctamente:', record);
        });
      }

      insertStmt.finalize();
    });
  });
});
