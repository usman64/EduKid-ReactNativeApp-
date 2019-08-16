import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCZipQbKElC8kjrTXw0K-kEFo3n5RUeonI",
    authDomain: "edukid-659ca.firebaseapp.com",
    databaseURL: "https://edukid-659ca.firebaseio.com",
    projectId: "edukid-659ca",
    storageBucket: "",
    messagingSenderId: "484953035232",
    appId: "1:484953035232:web:ad564bad23e5ba11"
  };
  // Initialize Firebase
  const Firebase=firebase.initializeApp(firebaseConfig);
  export default Firebase

