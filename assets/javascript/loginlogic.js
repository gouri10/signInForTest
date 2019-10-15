
// $(document).ready(function(){
//     $('.login-info-box').fadeOut();
//     $('.login-show').addClass('show-log-panel');
// });


$('.login-reg-panel input[type="radio"]').on('change', function () {
    if ($('#log-login-show').is(':checked')) {
        $('.register-info-box').fadeOut();
        $('.login-info-box').fadeIn();

        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');

    }
    else if ($('#log-reg-show').is(':checked')) {
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();

        $('.white-panel').removeClass('right-log');

        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
});

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      
      // [END_EXCLUDE]
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        console.log(JSON.stringify(user, null, '  '));
        
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        console.log("user signed out");
        // [START_EXCLUDE]
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE silent]
     
      // [END_EXCLUDE]
    });
    // [END authstatelistener]
   // document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('register').addEventListener('click', handleSignUp, false);
    //document.getElementById('googleButton').addEventListener('click', onSignIn, false);
    //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
  }


window.onload = function () {

    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');

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
    initApp();
};



function handleSignUp() {
    var userName = document.getElementById('registerUserName').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPswd').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user)
            {
                if (firebase.auth().currentUser) {
                    firebase.auth().currentUser.updateProfile({
                        displayName: userName,
                      }).then(function() {
                        console.log("successful");
                      }).catch(function(error) {
                        console.log("failure");
                      });
                 }
            }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);

        });

}


function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        // [START googlecredential]
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);
        // [END googlecredential]
        // Sign in with credential from the Google user.
        // [START authwithcred]
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END authwithcred]
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }





