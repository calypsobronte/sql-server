require('dotenv').config(); // Cargar variables de entorno desde .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true, // Habilita el cifrado si estás utilizando una conexión segura (SSL/TLS)
  },
});

async function getAllUsers() {
  try {
    const query = 'SELECT * FROM BlockchainFiles';
    const [results] = await sequelize.query(query);
    console.log(results);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

getAllUsers();
