import firebase from 'firebase';

const firebaseApp=firebase.initializeApp({

    apiKey: "AIzaSyCVwRA0brqtHdLA293cxZKniIx6j2WTIfQ",
    authDomain: "messenger-app-94361.firebaseapp.com",
    databaseURL: "https://messenger-app-94361.firebaseio.com",
    projectId: "messenger-app-94361",
    storageBucket: "messenger-app-94361.appspot.com",
    messagingSenderId: "1078479082873",
    appId: "1:1078479082873:web:5b44fb8980282e172bcba8",
    measurementId: "G-NXG4L2TM30"

});
const auth=firebaseApp.auth();
const db=firebaseApp.firestore();

export {auth,db};