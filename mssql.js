require('dotenv').config(); // Cargar variables de entorno desde .env

const sql = require('mssql');

async function connectToSqlServer() {
  try {
    // Configura la cadena de conexión a tu servidor SQL Server
    const config = {
      user: process.env.DB_USER_LOCAL,
      password: process.env.DB_PASSWORD_LOCAL,
      server: process.env.DB_HOST_LOCAL,
      database: process.env.FTP_HOST,
      options: {
        encrypt: true, // Habilita el cifrado si estás utilizando una conexión segura (SSL/TLS)
      },
    };

    // Establece la conexión
    await sql.connect(config);

    // Realiza una consulta
    const result = await sql.query`SELECT * FROM BlockchainFiles`;
    console.log(result.recordset);

    // Cierra la conexión
    await sql.close();
  } catch (error) {
    console.log('Error:', error);
  }
}

connectToSqlServer();
