require("@dotenvx/dotenvx").config();
const express = require("express");
const cron = require("node-cron");
const backupdb = require("./services/backupdb.service");
const app = express();

// Schedule cron job tiap jam 2 pagi
cron.schedule("0 2 * * *", () => {
  console.log("Starting database backup...");
  backupdb.postgresMainDB();
});

// Schedule cron job tiap jam 2 pagi
cron.schedule("0 2 * * 1", () => {
  console.log("Senin Starting database backup...");
  backupdb.mongodbMainDB();
  backupdb.mongodbCRMDB();
  backupdb.mongodbLandingPageDB();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server backup DB running on port ${PORT}`));
