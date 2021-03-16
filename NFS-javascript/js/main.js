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
    speed:3,
    traffic:3,
};

// сколько нужно доб полосок

function  getElementNeed(heg) {
   return  document.documentElement.clientHeight / heg + 1;

}



function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML='';
    car.style.left ='125px';
    car.style.top ='auto';

    for(let i=0; i< getElementNeed(100); i++){
        let  line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100)+'px';
        line.y = i*100;
        gameArea.appendChild(line);
    }
     for(let i=0; i< getElementNeed(100*setting.traffic); i++){
         const enemy= document.createElement('div');
         enemy.classList.add('enemy');
         enemy.y = -100 * setting.traffic * (i+1);
         enemy.style.top = enemy.y +'px'
         enemy.style.left= Math.floor(Math.random()*(gameArea.offsetWidth-50)) +'px';
         gameArea.appendChild(enemy);
     }


     //score

    setting.score=0;
    //после запуска мень значения игры
    setting.start = true;

    gameArea.appendChild(car);
    // доб Обьект лев
    setting.x = car.offsetLeft;
    setting.y=car.offsetTop;

    requestAnimationFrame(playGame);

}
function playGame() {


   // console.log('playGame');
    //Проверка если true
    if(setting.start){
        setting.score+=setting.speed;
        score.innerHTML ='SCORE<br>'+setting.score;
        //дац 2 после запуска выз дрога
        moveRoad();

        //двж врагов
        moveEnemy()


        //Если зажата лев умень
        //не уежала за пределы дорог setting.x > 0
        if(keys.ArrowLeft && setting.x > 0){
            //увелч скорость при наж
            setting.x-= setting.speed;
        }
        //Если зажата Правая увеличиваем
        // с дороги отн ширину машину
        if(keys.ArrowRight && setting.x< (gameArea.offsetWidth - car.offsetWidth)){
            //увелч скорость при нажs
            setting.x+=setting.speed;
        }

        //не уежала за пределы дорог setting.y > 0
        if(keys.ArrowUp && setting.y > 0){
            setting.y-=setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y+=setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        //сама себя долж вызывать
        requestAnimationFrame(playGame);
    }



};


function startRun(e){
    e.preventDefault();
    keys[e.key]=true;
};

function stopRun(e){
    e.preventDefault();
    keys[e.key]=false;

};
function  moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line, i) {
        line.y += setting.speed;
        line.style.top = line.y+'px';
        if(line.y > document.documentElement.clientHeight){
            line.y = -100;
        };

    });
}

function moveEnemy(){
    let enemy =document.querySelectorAll('.enemy');
    enemy.forEach((item)=>{

        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
      //  console.log('carRect', enemyRect);

        if(carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top
        ){
            setting.start = false;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
            console.log('dtp')
        }

        item.y +=setting.speed /2 ;
        item.style.top = item.y + 'px';

        if(item.y >= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left= Math.floor(Math.random()*(gameArea.offsetWidth-50)) +'px';
        }
    });

}


//stop runing
document.addEventListener('keyup', stopRun)
//begin add button
document.addEventListener('keydown', startRun)
//game start
start.addEventListener('click', startGame);

