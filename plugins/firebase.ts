import firebase from "firebase";
const defaultAppConfig = {
  apiKey: "AIzaSyC437ajrA-S9QJ2UkOeMOZV34AHndIYWSw",
  authDomain: "blog-nuxt-3e392.firebaseapp.com",
  projectId: "blog-nuxt-3e392",
  storageBucket: "blog-nuxt-3e392.appspot.com",
  messagingSenderId: "131955789621",
  appId: "1:131955789621:web:914c7e3251122da7e9067c"
};

export let db: any;
export let auth: any;

if (process.server) {
  const admin = require("firebase-admin");
  const serviceAccount = require("~/adminKey.json");
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  db = admin.firestore();
  auth = admin.auth();
} else if (!firebase.apps.length) {
  firebase.initializeApp(defaultAppConfig, "client");
  db = firebase.firestore();
  auth = firebase.auth();
} else {
  firebase.app();
}
