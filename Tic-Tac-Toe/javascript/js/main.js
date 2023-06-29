console.log("Hello from main.js")

let CellsEl = document.querySelectorAll('.cell');

let msgEl = document.querySelector('#msg');

let playerStick = ['X', 'O'];
let curretPlayer = 0;

function showMsg(msg){
    msgEl.innerHTML = msg;
    msgEl.style.display = 'block';
}

const hideMsg = () => {
    msgEl.innerHTML = '';
    msgEl.style.display = 'none';
}
CellsEl.forEach(CellsEl => {
    CellsEl.addEventListener('click', function(event){
        hideMsg();
        if(event.target.innerHTML == ''){
            event.target.innerHTML = playerStick[curretPlayer];
            if (curretPlayer == 0){
                curretPlayer = 1;
            } else {
                currentPlayer = 0;
            }
        }
        else {
            showMsg('Already played !');
        }
    });
});