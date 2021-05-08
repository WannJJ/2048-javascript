score = 0;
bestScore = 0;
side = 4;
board = new Array(4).fill(0).map(() => new Array(4).fill(0));
colors = ['#cdc1b4', '#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', '#edc850', '#edc53f', '#edc22e'];
t = 0.1;

cell1 = document.getElementsByClassName("cell1")[0];
cell2 = document.getElementsByClassName("cell2")[0];
cell3 = document.getElementsByClassName("cell3")[0];
cell4 = document.getElementsByClassName("cell4")[0];
cell5 = document.getElementsByClassName("cell5")[0];
cell6 = document.getElementsByClassName("cell6")[0];
cell7 = document.getElementsByClassName("cell7")[0];
cell8 = document.getElementsByClassName("cell8")[0];
cell9 = document.getElementsByClassName("cell9")[0];
cell10 = document.getElementsByClassName("cell10")[0];
cell11 = document.getElementsByClassName("cell11")[0];
cell12 = document.getElementsByClassName("cell12")[0];
cell13 = document.getElementsByClassName("cell13")[0];
cell14 = document.getElementsByClassName("cell14")[0];
cell15 = document.getElementsByClassName("cell15")[0];
cell16 = document.getElementsByClassName("cell16")[0];

cellBoard = [
  [cell1, cell2, cell3, cell4],
  [cell5, cell6, cell7, cell8],
  [cell9, cell10, cell11, cell12],
  [cell13, cell14, cell15, cell16],
];



displayScore = document.getElementById("Score");
displayBestScore = document.getElementById("Best");


/*
Add new cell, update score, check if game is over
 */
function draw() {
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      if (board[i][j] == 0) {
        cellBoard[i][j].innerHTML = "";
        cellBoard[i][j].style.zIndex = 0;
      } else {
        cellBoard[i][j].innerHTML = "" + board[i][j];
        cellBoard[i][j].style.zIndex = 10;

      }

      cellBoard[i][j].style.background = getColor(board[i][j]);
      if (board[i][j] >= 8) {
        cellBoard[i][j].style.color = 'white';
      } else {
        cellBoard[i][j].style.color = 'black';
      }

      //adapt font-size
      if (board[i][j] >= 1024) {
        cellBoard[i][j].style.fontSize = '40px';
      } else {
        cellBoard[i][j].style.fontSize = '50px';
      }

    }
  }
}

function updateGame() {

  emptyCells = [];
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      if (board[i][j] == 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  //Select random cell to add new number
  if (emptyCells.length > 0) {
    chosen = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    //New number is either 2 (with chance 75%) or 4 (25%)
    newNumber = (1 + Math.round(Math.random() - 0.25)) * 2;
    board[chosen[0]][chosen[1]] = newNumber;
    cellBoard[chosen[0]][chosen[1]].style.animation = "appear " + (t / 2) + "s linear";
  }



  if (bestScore < score) {
    bestScore = score;
  }

  displayScore.innerHTML = "Score<br>" + score;
  displayBestScore.innerHTML = "Best<br>" + bestScore;

  draw();

  // End game
  if (emptyCells.length <= 1 && !checkGame()) {
    document.getElementById("End").style.display = "block";
  }

}


function left() {
  change = false;
  for (let i = 0; i < side; i++) {
    idx_last = -1;
    last_number = -1;

    for (let j = 0; j < side; j++) {
      if (board[i][j] == last_number) {
        //move cell j to idx_last and merge
        board[i][j] = 0;
        last_number *= 2;
        board[i][idx_last] = last_number;
        score += last_number;

        cellBoard[i][j].style.animation = "moveRight" + (idx_last + 1) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[i][idx_last + 1] == 0) {
        //move cell j to idx_last+1
        board[i][idx_last + 1] = board[i][j];
        last_number = board[i][j];

        cellBoard[i][j].style.animation = "moveRight" + (idx_last + 2) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        idx_last = idx_last + 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = j;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    setTimeout(() => {
      updateGame();
    }, t * 1000);
  }
}

function right() {
  change = false;
  for (let i = 0; i < side; i++) {
    idx_last = side;
    last_number = -1;

    for (let j = side - 1; j >= 0; j--) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[i][idx_last] = last_number;
        score += last_number;

        cellBoard[i][j].style.animation = "moveRight" + (idx_last + 1) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[i][idx_last - 1] == 0) {
        board[i][idx_last - 1] = board[i][j];
        last_number = board[i][j];

        cellBoard[i][j].style.animation = "moveRight" + (idx_last) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        idx_last = idx_last - 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = j;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    setTimeout(() => {
      updateGame();
    }, t * 1000);
  }
}

function down() {
  change = false;
  for (let j = 0; j < side; j++) {
    idx_last = side;
    last_number = -1;

    for (let i = side - 1; i >= 0; i--) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[idx_last][j] = last_number;
        score += last_number;

        cellBoard[i][j].style.animation = "moveDown" + (idx_last + 1) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[idx_last - 1][j] == 0) {
        board[idx_last - 1][j] = board[i][j];
        last_number = board[i][j];

        cellBoard[i][j].style.animation = "moveDown" + (idx_last) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        idx_last = idx_last - 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = i;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    setTimeout(() => {
      updateGame();
    }, t * 1000);
  }
}

function up() {
  change = false;
  for (let j = 0; j < side; j++) {
    idx_last = -1;
    last_number = -1;

    for (let i = 0; i < side; i++) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[idx_last][j] = last_number;
        score += last_number;

        cellBoard[i][j].style.animation = "moveDown" + (idx_last + 1) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[idx_last + 1][j] == 0) {
        board[idx_last + 1][j] = board[i][j];
        last_number = board[i][j];

        cellBoard[i][j].style.animation = "moveDown" + (idx_last + 2) + " " + t + "s linear";
        setTimeout(() => {
          cellBoard[i][j].style.animation = "";
        }, t * 1000);

        idx_last = idx_last + 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = i;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    setTimeout(() => {
      updateGame();
    }, t * 1000);
  }

}

function getColor(number) {
  cell_level = Math.log2(number);
  switch (cell_level) {
    case -Infinity:
      return colors[0];
      break;
    case 1:
    case 2:
    case 3:
      return colors[cell_level];
      break;
    case 4:
    case 5:
    case 6:
      return colors[cell_level];
      break;
    case 7:
    case 8:
    case 9:
      return colors[cell_level];
      break;
    case 10:
      return colors[cell_level];
      break;
    default:
      return colors[11];
  }
}

function checkGame() {
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      if (board[i][j] == 0) {
        return true;
      }
      if (i + 1 < side && board[i][j] == board[i + 1][j] ||
        j + 1 < side && board[i][j] == board[i][j + 1]) {
        return true;
      }
    }
  }
  return false;
}


function startGame() {
  score = 0;
  board = new Array(4).fill(0).map(() => new Array(4).fill(0));
  document.getElementById("End").style.display = "none";

  updateGame();


}

document.addEventListener("DOMContentLoaded", () => {
  startGame();

});
window.addEventListener('keydown', (e) => {
  //Disable arrow keys scrolling in browser
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
  switch (e.keyCode) {
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
  }

});