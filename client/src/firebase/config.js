import firebase from 'firebase/compat/app'
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAuLJCrvrz_MW9WoDCNLY99NZvv1gREC58",
    authDomain: "my-project1-322804.firebaseapp.com",
    projectId: "my-project1-322804",
    storageBucket: "my-project1-322804.appspot.com",
    messagingSenderId: "1094401926048",
    appId: "1:1094401926048:web:ec92cbee46d43a79347ac5",
    measurementId: "G-E3Z95DRPCP"
  };
  firebase.initializeApp(firebaseConfig)
  export const storage= firebase.storage()
  export default firebase