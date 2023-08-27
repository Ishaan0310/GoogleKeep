var admin = require("firebase-admin");
var serviceAccount = require("D:/Sample project/server/keep-397116-firebase-adminsdk-ujbut-89dc3345de.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
