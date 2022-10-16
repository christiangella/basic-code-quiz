/* FUNCTION: Defines function for printing scores to the page. */
function printLeaderboard() {
    /* FUNCTION: Retrieves scores in local storage OR sets new array. */
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    /* FUNCTION: Creates list length for number of scores and sets them to be a list item. */
    for (var i = 0; i < highscores.length; i += 1) {
        var listifyScores = document.createElement('li');
        listifyScores.textContent = highscores[i].username + ' scored a total of ' + highscores[i].score;

    /* FUNCTION: Grabs ID of highscore and appends them to the ordered list node. */
        var leaderboardEl = document.getElementById('highscore')
        listifyScores.append(leaderboardEl);
    }
}

/* FUNCTION: Prints scores to the leaderboard page automatically. */
printLeaderboard()