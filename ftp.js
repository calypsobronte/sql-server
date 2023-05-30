require('dotenv').config(); // Cargar variables de entorno desde .env
const fs = require('fs');
const path = require('path')
const { Client } = require('basic-ftp');

  const ftpConfig = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD
  };
async function downloadFile(rute) {
  const client = new Client();
  const localFilePath = path.join(process.cwd(), 'uploads', path.basename(rute));
  try {
    await client.access(ftpConfig);
    await client.downloadTo(localFilePath, rute);
    const fileStream = fs.createReadStream(localFilePath);
    fileStream.on('close', () => {
      console.log(`Sending file ${rute} as response to client`);
    });


  } catch (err) {
    console.log(err);
  } finally {
    client.close();

  }
}
// Ejemplo de uso
downloadFile('CARPETA_SERVIDOR_DESCARGAR/NOMBRE_ARCHIVO');
