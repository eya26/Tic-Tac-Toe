console.log("Hello from main.js");

let CellsEl = document.querySelectorAll('.cell');

let msgEl = document.querySelector('#msg');

let playerStick = ['X', 'O'];
let playerName = ['Player 1', 'Player 2'];
let playerScore = [
  localStorage.getItem('player0') && !isNaN(localStorage.getItem('player0')) ? localStorage.getItem('player0') : 0,
  localStorage.getItem('player1') && !isNaN(localStorage.getItem('player1')) ? localStorage.getItem('player1') : 0
];

let winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
  ];
let currentPlayer = 0;
let end = false;
let winner = false;

let namePlayer1El = document.querySelector("#player1 .name");
let namePlayer2El = document.querySelector("#player2 .name");
namePlayer1El.innerHTML = playerName[0];
namePlayer2El.innerHTML = playerName[1];

let scorePlayer1El = document.querySelector("#player1 .score");
let scorePlayer2El = document.querySelector("#player2 .score");
scorePlayer1El.innerHTML = playerScore[0];
scorePlayer2El.innerHTML = playerScore[1];

function showMsg(msg) {
  msgEl.innerHTML = msg;
  msgEl.style.display = 'block';
}

const hideMsg = () => {
  msgEl.innerHTML = '';
  msgEl.style.display = 'none';
}

const verify = () => {
  let found = false;

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      CellsEl[a].innerHTML === playerStick[currentPlayer] &&
      CellsEl[b].innerHTML === playerStick[currentPlayer] &&
      CellsEl[c].innerHTML === playerStick[currentPlayer]
    ) {
        winner = playerName[currentPlayer];
    }

  }

  // If no winner found, check if all the cells have been played
  if (winner === false) {
    CellsEl.forEach(cellEl => {
      if (cellEl.innerHTML === '') {
        found = true;
      }
    });
  }

  if (!found || winner !== false) {
    end = true;
  }
}

CellsEl.forEach(cellEl => {
  cellEl.addEventListener('click', function(event) {
    hideMsg();

    if (!end) {
      if (event.target.innerHTML === '') {
        event.target.innerHTML = playerStick[currentPlayer];

        // Verify the end of the game
        verify();

        if (!end) {
          currentPlayer = (currentPlayer === 0) ? 1 : 0;
        } else {
          if (winner === false) {
            showMsg('Game ended - No winner ! <a href="">Play Again</a>');
          } else {
            playerScore[currentPlayer]++;
            if (currentPlayer === 0) {
              scorePlayer1El.innerHTML = playerScore[currentPlayer];
            } else {
              scorePlayer2El.innerHTML = playerScore[currentPlayer];
            }
            localStorage.setItem('player' + currentPlayer, playerScore[currentPlayer]);
            showMsg('Game ended - ' + winner + ' wins! <a href="">Play Again</a>');
          }
        }
      } else {
        showMsg('Already played !');
      }
    } else {
      showMsg('Game already ended ! <a href="">Play Again</a>');
    }
  });
});
