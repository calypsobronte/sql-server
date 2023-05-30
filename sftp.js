require('dotenv').config(); // Cargar variables de entorno desde .env

const fs = require('fs');
const { Client } = require('ssh2');

const sshConfig = {
  host: process.env.SFTP_HOST,
  port: 22,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASSWORD
};
const ssh = new Client();
// Función para descargar un archivo desde el servidor remoto
function downloadFile(remoteFilePath, localFilePath) {


  return new Promise((resolve, reject) => {
    ssh.connect(sshConfig)
    ssh.on('ready', () => {
      ssh.sftp((err, sftp) => {
        if (err) {
          reject(err);
          return;
        }

        sftp.exists(remoteFilePath, (exist) => {
          if (!exist) {
            ssh.end();
            reject(new Error('El archivo remoto no existe'));
            return;
          }

          const readStream = sftp.createReadStream(remoteFilePath);
          const writeStream = fs.createWriteStream(localFilePath);

          readStream.on('error', (err) => {
            ssh.end();
            reject(err);
          });

          writeStream.on('finish', () => {
            ssh.end();
            resolve();
          });

          writeStream.on('error', (err) => {
            ssh.end();
            reject(err);
          });

          readStream.pipe(writeStream);
        });
      });
    });

    ssh.on('error', (err) => {
      reject(err);
    });

    ;
  });
}
downloadFile('carpeta_remota/nombre_archivo', 'nombre?archivo_local')
  .then(() => {
    console.log('Archivo descargado correctamente.');
  })
  .catch((err) => {
    console.error('Error al descargar el archivo:', err);
  });