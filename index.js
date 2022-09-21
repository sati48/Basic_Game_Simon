let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level  " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);


});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200);
        startOver();
    }
}
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("level  " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#" + randomColorChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);

}
function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);

}
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}