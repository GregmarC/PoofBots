import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD297p6vRVCMI1sV5jgcFbSukBg3qEI1k0",
    authDomain: "poofbot-604cd.firebaseapp.com",
    databaseURL: "https://poofbot-604cd.firebaseio.com",
    projectId: "poofbot-604cd",
    storageBucket: "poofbot-604cd.appspot.com",
    messagingSenderId: "770219793050",
    appId: "1:770219793050:web:375c9b5a64ab7936de5d23",
    measurementId: "G-LYW9KQM0YS"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

//updates firestore settings
db.settings({ timestampsInSnapshots: true});


const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();

export {
  database,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  db
};
