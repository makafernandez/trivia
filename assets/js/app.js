// https: //opentdb.com/api.php?amount=10
// https: //opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=base64
// https: //opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean

// https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
// https://opentdb.com/api_token.php?command=request
// https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE
$(document).ready(function() {
  
});

// FIREBASE
function register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      verify();
    })
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      console.log(error.message);
    // ...
    });
}

function entry() {
  var email2 = document.getElementById('email2').value;
  var password2 = document.getElementById('password2').value;
  
  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      console.log(error.message);
    // ...
    });
}

function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Active user');
      appears(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log('ñññ');
      console.log(user.emailVerified);
      console.log('ñññ');
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('There is no active user');
      contenido.innerHTML = `
      <div class="container mt-2">
        <div class="alert alert-warning" role="alert">
        There is no active user!
        </div>
      </div>
    `;
      // ...
    }
  });
}
observer();

function appears(user) {
  var user = user;
  var contenido = document.getElementById('contenido');
  if (user.emailVerified) {
    contenido.innerHTML = `
    <div class="container mt-2">
      <div class="alert alert-success" role="alert">
      <h6 class="alert-heading">Welcome! ${user.email}</h6>
      <p>Aww yeah, If you are ready to start playing click on the "play" button.</p>
      <hr>
      </div>
      <button onclick="closing()" class="btn btn-lg btn-outline-dark">Log out</button> 
    </div>
    `;
  }
}

function closing() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('saliendo');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

function verify() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  // Email sent.
    console.log('Send email...');
  }).catch(function(error) {
  // An error happened.
    console.log(error);
  });
}


// COMENZAR JUEGO
$('#startBtn').click(function() {

});

let token = '';
fetch('https://opentdb.com/api_token.php?command=request')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data.response_message);
    token = data.token;
  });

fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&token=${token}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });

  