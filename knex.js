require('dotenv').config(); // Cargar variables de entorno desde .env

const knex = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // instanceName: process.env.DB_INSTANCE, // este si es requerido (optional)
    options: {
      encrypt: false, // Set to true if using SSL/TLS
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