import admin from "firebase-admin";
import config from "../config";

// Getting acccess to the Firebase Realtime Database
// Guide: https://firebase.google.com/docs/database/admin/start
admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccountKeyFirebase),
  databaseURL: config.databaseURL,
});

const db = admin.database();

export default db;
