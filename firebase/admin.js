
var admin = require("firebase-admin");

// var serviceAccount = require("./firebaseKeys.json");

var serviceAccount = JSON.parse(process.env.FIREBASE_KEYS)

try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
}catch(e) {
  console.log(e)
}


export const firestore = admin.firestore()