let score = document.querySelector('.score');
let game = document.querySelector('.game');
let start = document.querySelector('.start');
let gameArea = document.querySelector('.gameArea');




let car = document.createElement('div');
car.classList.add('car');

const keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
};

const setting ={
    start:false,
    score:0,
    speed:3
};

function startGame(){
    start.classList.add('hide');
    //после запуска мень значения игры
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);

}
function playGame() {
    console.log('playGame');
    //Проверка если true
    if(setting.start=== true){
        //сама себя долж вызывать
        requestAnimationFrame(playGame);
    }



}


function startRun(e){
    e.preventDefault();
    keys[e.key]=true;
}

function stopRun(e){
    e.preventDefault();
    keys[e.key]=false;

}





//stop runing
document.addEventListener('keyup', stopRun)
//begin add button
document.addEventListener('keydown', startRun)
//game start
start.addEventListener('click', startGame);

