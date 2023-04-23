var Name = prompt("Enter your name for playing !");
$("#high-score").html(Name + "'s highest Level is ");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;
var score = 0;
// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {  //This is only call one time in the game 
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    // $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// This function is write for the user click traking

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  // nextSequence();
  
  checkAnswer(userClickedPattern.length - 1); // function call take the value and check sequence is right or not

});

// This function is used for the generet the sequence in the simon game

function nextSequence() {

  // Here now i can empty the array

  userClickedPattern = []; // When again nextSequence function call that time userclikedPattern array is empty

  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

// This functin used for the check the Answer when user clicked the button 

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //Here check the preset array element with similar array index of the game pattern
      
    console.log("sucsess");

    if (userClickedPattern.length === gamePattern.length) { // When the gamepattern all color are checked with the userclickedpattern and same the index then call the again nextSequence() and repeat
      
      setTimeout(function () {
  
        nextSequence();

      }, 1000);
    }
  }

  else {

    $("#level-title").text("Game Over, Press Any Key to Restart");

    var audio = new Audio("/sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    
    setTimeout(function () {

      $("body").removeClass("game-over");

    }, 200);

    scoreIndicator(level);
    
    startOver();
  }
};

//This function is used for the reset the game

function startOver() {
  
  level = 0;
  started = false;
  gamePattern = [];

};

function scoreIndicator(level) {
  


    if (level > score) {
      
      score = level;

      $("#high-score").html(Name + "'s highest Level is " + score);
      
  };
  
}