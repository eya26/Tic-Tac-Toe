console.log("Hello from main.js")

let CellsEl = document.querySelectorAll('.cell');

let msgEl = document.querySelector('#msg');

let playerStick = ['X', 'O'];
let playerName = ['Player1', 'Player 2'];
let playerScore = [
    localStorage.getItem('player0') && !isNaN(localStorage.getItem('player0')) ? localStorage.getItem('player0') : 0,
    localStorage.getItem('player1') && !isNaN(localStorage.getItem('player1'))? localStorage.getItem('player1') : 0
]
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

function showMsg(msg){
    msgEl.innerHTML = msg;
    msgEl.style.display = 'block';
}

const hideMsg = () => {
    msgEl.innerHTML = '';
    msgEl.style.display = 'none';
}

const verify = () => {
    let found = false 

    if (
        CellsEl[0].innerHTML == currentPlayer &&
        CellsEl[1].innerHTML == currentPlayer &&
        CellsEl[2].innerHTML == currentPlayer
    ){
       winner = currentPlayer;
    }


    if (
        CellsEl[3].innerHTML == currentPlayer &&
        CellsEl[4].innerHTML == currentPlayer &&
        CellsEl[5].innerHTML == currentPlayer
    ){
       winner = currentPlayer;
    }
    // If no winner found, check if all the cell have been played
    if (winner === false) {
        CellsEl.forEach(cellEl => {
            if (cellEl.innerHTML == ''){
                found = true;
            }
        });
    }
    
    if (!found || winner !== false){
        end = true;
    }


}
CellsEl.forEach(CellsEl => {
    CellsEl.addEventListener('click', function(event){
        hideMsg();

        if (!end){
            if(event.target.innerHTML == ''){
                event.target.innerHTML = playerStick[currentPlayer];

                // Verify the end of the game 

                verify();

                if (!end){
                    if (currentPlayer == 0){
                        currentPlayer = 1;
                    } else {
                        currentPlayer = 0;
                    }
                } else {
                    if (winner === false){
                        showMsg('Game ended - No winner ! <a href"">Play Again</a>');
                    } else {
                        
                        if (currentPlayer === 0){
                            scorePlayer1El.innerHTML = ++playerScore[currentPlayer];
                        } else {
                            scorePlayer2El.innerHTML = ++playerScore[currentPlayer];
                        }
                        localStorage.setItem('player' + currentPlayer, playerScore[currentPlayer]);
                        showMsg('Game ended -' + winner + 'wins !<a href"">Play Again</a>');
                    }
                }
                
            }
            else {
                showMsg('Already played !');
            }
        } else {
            showMsg('Game already ended ! <a href"">Play Again</a>');
        }
    });
});