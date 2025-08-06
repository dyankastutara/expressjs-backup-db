const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

module.exports = {
  // Fungsi backup database PostgreSQL
  postgresMainDB() {
    const BACKUP_DIR = path.resolve(__dirname, "../backups/pg");
    // Pastikan folder backup ada
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const date = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .split(".")[0];
    const filename = `${BACKUP_DIR}/backup_${date}.sql`;

    // Export password ke env agar pg_dump bisa akses tanpa prompt
    const cmd = `PGPASSWORD=${process.env.PG_PASSWORD} pg_dump -U ${process.env.PG_USER} -h ${process.env.PG_HOST} -p ${process.env.PG_PORT} -F c -b -v -f ${filename} ${process.env.PG_DB}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Backup stderr: ${stderr}`);
        return;
      }
      console.log(`Backup success: ${filename}`);
    });
  },
  mongodbMainDB() {
    const BACKUP_DIR = path.resolve(__dirname, "../backups/mongodb/main");
    // Pastikan folder backup ada
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const date = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .split(".")[0];
    const backupPath = `${BACKUP_DIR}/backup_${date}`;
    // Export password ke env agar pg_dump bisa akses tanpa prompt
    const cmd = `mongodump --uri="${process.env.MONGO_MAIN_URI}" --out="${backupPath}"`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Backup stderr: ${stderr}`);
        return;
      }
      console.log(`Backup success: ${backupPath}`);
    });
  },
  mongodbCRMDB() {
    const BACKUP_DIR = path.resolve(__dirname, "../backups/mongodb/crm");
    // Pastikan folder backup ada
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const date = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .split(".")[0];
    const backupPath = `${BACKUP_DIR}/backup_${date}`;

    // Export password ke env agar pg_dump bisa akses tanpa prompt
    const cmd = `mongodump --uri="${process.env.MONGO_CRM_URI}" --out="${backupPath}"`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Backup stderr: ${stderr}`);
        return;
      }
      console.log(`Backup success: ${backupPath}`);
    });
  },
  mongodbLandingPageDB() {
    const BACKUP_DIR = path.resolve(__dirname, "../backups/mongodb/lp");
    // Pastikan folder backup ada
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const date = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .split(".")[0];
    const backupPath = `${BACKUP_DIR}/backup_${date}`;

    // Export password ke env agar pg_dump bisa akses tanpa prompt
    const cmd = `mongodump --uri="${process.env.MONGO_LP_URI}" --out="${backupPath}"`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Backup stderr: ${stderr}`);
        return;
      }
      console.log(`Backup success: ${backupPath}`);
    });
  },
};
