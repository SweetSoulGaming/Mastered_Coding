function printHighscores() {
    // either get score from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + "-"+ score.score;

        // display on page
        var olEl = document.getElementById("highscore");
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighScores;

// run function
printHighscores()