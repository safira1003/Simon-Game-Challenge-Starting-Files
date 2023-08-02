
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    // Animate the button when clicked
    animatePress(userChosenColour);

    // Play sound when the button clicked
    playSound(userChosenColour);

    // Check answer
    checkAnswer(userClickedPattern.length - 1);


});

$(document).on("keydown", function () {
    if (!started) {
        nextSequence();
        $("#level-title").html("Level " + level);
        started = true;
    }
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // increase level
    level += 1;

    // Update title
    $("#level-title").html("Level " + level);

    // Animate the button when chosen
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // Play sound when the button chosen
    playSound(randomChosenColour);
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct!");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("Wrong!");

        // play the wrong sound
        playSound("wrong");

        // apply the animation if the answer is wrong
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // change the title
        $("#level-title").html("Game Over, Press Any Key to Restart");

        // mereset semuah
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
