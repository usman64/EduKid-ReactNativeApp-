import firebase from 'firebase'

const firebaseConfig = {
    apiKey: /*apikey */'',
    authDomain: /*authdomain */'',
    databaseURL: /*dburl*/'',
    projectId: /*projectid */'',
    storageBucket: "",
    messagingSenderId: /*msid */'',
    appId: /*appid */''
  };
  // Initialize Firebase
  const Firebase=firebase.initializeApp(firebaseConfig);
  export default Firebase


  /*Edit the firebase config with your config to setup the database */