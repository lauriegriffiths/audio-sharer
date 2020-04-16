const firebase = require("firebase");
require("@firebase/firestore");
require("firebase/storage");

firebase.initializeApp({
  apiKey: "AIzaSyDUHOZ9nNIHihQdd5bwe0cDxXkCeAhG46I",
  projectId: "retool-test-5fc6b",
  storageBucket: "retool-test-5fc6b.appspot.com"
});
const db = firebase.firestore();
const storage = firebase.storage();

export const Firebase = firebase;
export const DB = db;
export const Storage = storage;
