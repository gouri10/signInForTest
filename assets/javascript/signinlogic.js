
  

  $(document).ready(function() {
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCgpDXJQxEL70zM54_E4S0fyClurZZHW7E",
    authDomain: "signin-4f78f.firebaseapp.com",
    databaseURL: "https://signin-4f78f.firebaseio.com",
    projectId: "signin-4f78f",
    storageBucket: "signin-4f78f.appspot.com",
    messagingSenderId: "427851444370",
    appId: "1:427851444370:web:80b571b9b8065835bdf64b",
    measurementId: "G-EQ0QNC2P8L"
  };
   
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const auth = firebase.auth();
    const db = firebase.firestore();

    $("#signInBtn").click(function(event) {
        event.preventDefault();
        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();
        console.log({
            'Email': email,
            'Password': password
        })
        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage)
        });
        console.log(firebase.auth().currentUser);
        //abdul@nsxnak.com
        //xxasxasx
    });


    $("#register").click(function(event) {
        event.preventDefault();
        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();
        console.log({
            'Email': email,
            'Password': password
        })
        auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage);
        });
    });



    $("#gSignInBtn").click(function() {
        //$("p").hide();
    });
    $("#fSignInBtn").click(function() {
        //$("p").hide();
    });
});