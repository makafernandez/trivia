// https: //opentdb.com/api.php?amount=10
// https: //opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=base64
// https: //opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean

// https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
// https://opentdb.com/api_token.php?command=request
// https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDMdepuZ02IJNHFMT1gQ00uL7sTVSApmRM",
  authDomain: "trivia-f941e.firebaseapp.com",
  databaseURL: "https://trivia-f941e.firebaseio.com",
  projectId: "trivia-f941e",
  storageBucket: "trivia-f941e.appspot.com",
  messagingSenderId: "643890857113"
};
firebase.initializeApp(config);

// Al cargar:
$(document).ready(function() {
  
  // Splash
  $(function() {
    setTimeout(function() {
      $('#splash').fadeOut(500);
    }, 2000);
  });

  // Recuperar listado de categorías:
  let categories = '';
  fetch('https://opentdb.com/api_category.php')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Cargar categorías en las opciones de settings:
      $.each(data.trivia_categories, function(index, item) {
        $('#categorySelect').append(`<option value="${item.id}">${item.name}</option>`);
      });
    });
  
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
        There is no active user! Log in or Resgister.
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
      <button onclick="closing()" class="btn btn-outline-dark">Log out</button>
      </div>
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

// SETTINGS:
let category = '';
let difficulty = '';
let amount = '';
let type = '';

// Slider
let slider = document.getElementById('slider');
let output = document.getElementById('output');
output.innerHTML = slider.value; // Display the default slider value

$('#submitBtn').click(function() {
  // Capturar Categoría:
  category = $('#categorySelect').val();
  // Capturar Dificultad:
  difficulty = $('#difficultySelect').val();
  
  // Capturar Cantidad de Preguntas:
  $('#slider').on('input', function() {  // Update the current slider value (each time you drag the slider handle)
    output.innerHTML = slider.value;
  });
  amount = slider.value;
  
  // Capturar tipo de juego:
  type = $('#typeRadios input').val();

  console.log(category);
  console.log(difficulty);
  console.log(amount);
  console.log(type);
});

// COMENZAR JUEGO
let token = '';

$('#startBtn').click(function() {
  // Solicita token:
  fetch('https://opentdb.com/api_token.php?command=request')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.response_message);
      token = data.token;
    });
  
  // Solicita set de preguntas, según settings:
  fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
});

// VISTAS 
$('#startBtn').click(function() {
  $('#login').hide();
});
$('#startBtn').click(function() {
  $('#contenido').hide();
});
$('#startBtn').click(function() {
  $('#startBtn').hide();
});
$('#startBtn').click(function() {
  $('#welcome').show();
});
$('#startBtn').click(function() {
  $('#settings').show();
});
$('#startBtn').click(function() {
  $('#about').show();
});