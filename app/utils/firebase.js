import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCymyFVbFUWer2EydHvYRTYPBJJSPLJjZU",
    authDomain: "app-mascotas-b80ca.firebaseapp.com",
    databaseURL: "https://app-mascotas-b80ca.firebaseio.com",
    projectId: "app-mascotas-b80ca",
    storageBucket: "app-mascotas-b80ca.appspot.com",
    messagingSenderId: "218275156556",
    appId: "1:218275156556:web:df60a737c3c7514e245ae9"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);