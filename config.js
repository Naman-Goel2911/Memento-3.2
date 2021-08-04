import * as firebase from 'firebase'

require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyAW16qPbnLo9klrjTyr4_ealKAL4YheduY",
    authDomain: "memento-f74d0.firebaseapp.com",
    projectId: "memento-f74d0",
    storageBucket: "memento-f74d0.appspot.com",
    messagingSenderId: "335585856127",
    appId: "1:335585856127:web:cab092c8fc2832ca388d4a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();