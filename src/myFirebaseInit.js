import firebase from "@firebase/app";
import "@firebase/database";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDMRuPcRLMcVizjRvIi6YYHj06c5zGxtDY",
    authDomain: "my-semproj.firebaseapp.com",
    databaseURL: "https://my-semproj.firebaseio.com",
    projectId: "my-semproj",
    storageBucket: "my-semproj.appspot.com",
    messagingSenderId: "570455615783",
    appId: "1:570455615783:web:7ca0b2d0c59cc092"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const MYDB = firebase.database();