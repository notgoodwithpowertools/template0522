import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";


// Firestore
var config = {
    apiKey: "AIzaSyD3nuoNJHlZHVdYDhM607iPDGgv24Y7wxw",
    authDomain: "fstore1-dev.firebaseapp.com",
    // databaseURL: "https://fstore1-dev.firebaseio.com",
    projectId: "fstore1-dev",
    storageBucket: "fstore1-dev.appspot.com",
    // messagingSenderId: "1031943081436"
}

console.log("Firestore config:", config)
const app = initializeApp(config)
const firestoreDB = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

export { firestoreDB, auth, storage }
// const settings = {/* your settings... */ timestampsInSnapshots: true}
// let firestoreDB = firebase.firestore()
// firestoreDB.settings(settings)