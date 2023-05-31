require('dotenv').config(); // Cargar variables de entorno desde .env

const knex = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER_LOCAL,
    password: process.env.DB_PASSWORD_LOCAL,
    database: process.env.DB_DATABASE_LOCAL,
    options: {
      instanceName: process.env.DB_INSTANCE, // este si es requerido (optional)
      encrypt: true, // Set to true if using SSL/TLS
      trustServerCertificate: true // Set to true if using a self-signed certificate
    },
  },
});


knex('BlockchainFiles')
  .select('*')
  .then(rows => {
    console.log(rows);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy(); // Cerrar la conexión cuando hayas terminado
  });