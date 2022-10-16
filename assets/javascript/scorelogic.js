var leaderboardEl = document.getElementById('highscore')
/* FUNCTION: Defines function for printing scores to the page. */

function printLeaderboard() {
    /* FUNCTION: Retrieves scores in local storage OR sets new array. */
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    highscores.sort(function (a, b) {
        return b.score - a.score;
      });
    

    /* FUNCTION: Creates list length for number of scores and sets them to be a list item. */
    for (var i = 0; i < highscores.length; i += 1) {
        var createList = document.createElement('p');
        createList.textContent = i + 1 + '. ' + highscores[i].username + ' scored a total of ' + highscores[i].score;
    /* FUNCTION: Grabs ID of highscore and appends them to the ordered list node. */
        leaderboardEl.appendChild(createList);
    }
}

/* FUNCTION: Defines function for clearing scores by removing localStorage. */
function clearScore() {
    window.localStorage.removeItem('highscores')
    window.location.reload()
}

/* FUNCTION: Prints scores to the leaderboard page automatically. */
printLeaderboard()
/* FUNCTION: Connects button to function clearScore and removes localStorage. */
document.getElementById('wipe').onclick = clearScore