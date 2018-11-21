import * as firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2XL8xqIpUEeAIUcpIWlGooKDfSzgC8hA",
    authDomain: "system-rezerwacyjny.firebaseapp.com",
    databaseURL: "https://system-rezerwacyjny.firebaseio.com",
    projectId: "system-rezerwacyjny",
    storageBucket: "system-rezerwacyjny.appspot.com",
    messagingSenderId: "80781529056"
};
firebase.initializeApp(config);

const fire = firebase.firestore();
fire.settings({ timestampsInSnapshots: true })

export const db = fire;