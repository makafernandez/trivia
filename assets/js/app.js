//https: //opentdb.com/api.php?amount=10
//https: //opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=base64
//https: //opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean

// https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
// https://opentdb.com/api_token.php?command=request
// https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE
$(document).ready(function() {
  
});

// COMENZAR JUEGO
$('#startBtn').click(function() {

});

let token = '';
fetch(`https://opentdb.com/api_token.php?command=request`)
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
  

  