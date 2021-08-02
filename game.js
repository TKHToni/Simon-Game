var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var randomNumber = 0;

var started = false;

var lost = false;

// Game 1st round listener

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Game colour generation

function nextSequence() {
  randomNumber = Math.round(Math.random()*3);
  level = ++level;
  $("h1").html("Level " + level);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  new Audio('sounds/' + randomChosenColour + '.mp3').play();
}

// CPU Pattern Logging







// Animations and Audio CPU





// Player click Listener

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

// Animation and Audio Player

function playSound(name) {
  new Audio('sounds/' + name + '.mp3').play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
      $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// Checking user answer

function checkAnswer(currentLevel) {

  // Case 1: the user answered right until the penultimate button. Checking the last button now...

  if (currentLevel == gamePattern.length-1) {

    // Case 1.1: the user got the last button right

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    setTimeout(function(){nextSequence();}, 1000);
    userClickedPattern = [];

    }

    // Case 1.2: the user got the last button wrong

    else {
      lost = true;
      new Audio('sounds/wrong.mp3').play();

      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")}, 200);

      $("h1").text("Game Over, Press Any Key To Restart");
      $(document).keypress(function(){
        if (lost == true) {
          startOver();
        }
      });
    }
  }

  // Case 2: the user got it wrong somewhere before the penultimate button

  else if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    lost = true;
    new Audio('sounds/wrong.mp3').play();

    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 200);

    $("h1").text("Game Over, Press Any Key on the Keyboard To Restart");
    $(document).keypress(function(){
      if (lost == true) {
        startOver();
      }
    });
  }

  // Case 3: the user got it right but haven't reached the the penultimate button yet
}

// Starting game over function

function startOver() {
  lost = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $("h1").text("Press A Key to Start");
}
