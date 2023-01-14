import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAc_3XI4QRXy6sj0ScUikcP1nc9VtmrUKo",
    authDomain: "nexstoc-camera-app.firebaseapp.com",
    projectId: "nexstoc-camera-app",
    storageBucket: "nexstoc-camera-app.appspot.com",
    messagingSenderId: "749920248797",
    appId: "1:749920248797:web:10548706cc009651ea8c34",
    measurementId: "G-5MKE1E5S72"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export {firebase}
