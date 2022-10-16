console.log (highscores)
function printLeaderboard() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    for (var i = 0; i < highscores.length; i += 1) {
        var listifyScores = document.createElement('li')
        listifyScores.textContent = highscores[i].playerName + ' scored a total of ' + highscores[i].score;

        var leaderboardEl = document.getElementById('highscores')
        listifyScores.appendChild(leaderboardEl);
    }
}

printLeaderboard();