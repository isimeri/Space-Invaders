const board = document.querySelector(".board");
const textP = document.querySelector(".text");
const textCard = document.querySelector(".text-container");
const restartBtn = document.querySelector(".restartBtn");
const startBtn = document.querySelector(".startBtn");
const controls = document.querySelector(".instructions-container");
const width = 15;
let enemies = [3,4,5,6,7,8,9,10,11,18,19,20,21,22,23,24,25,26,33,34,35,36,37,38,39,40,41];
let aliens = [...enemies];
let aliensLastColumn = [11,26,41];
let aliensFirstColumn = [3,18,33];
let cells = [];
let direction = 1;
let gameOver = false;
let enemyInterval;

restartBtn.addEventListener("click", ()=>{
    while(board.firstChild){
        board.removeChild(board.firstChild);
    }
    cells = [];
    aliens = [...enemies];
    aliensLastColumn = [11,26,41];
    aliensFirstColumn = [3,18,33];
    createBoard();
    textCard.classList.add("hide");
    gameOver = false;
});
startBtn.addEventListener("click", ()=>{
    createBoard();
    startBtn.style.display = "none";
    board.style.display = "flex";
    controls.style.display = "flex"
});

function createBoard(){
    for(let i =0; i<width*width; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cells.push(cell);
        board.appendChild(cell);
    }
    paintBoard();
    cells[217].classList.add("hero");
    document.addEventListener("keydown", moveHero);
    document.addEventListener("keydown", shootLaser);
    enemyInterval = setInterval(moveEnemy, 200);
}

// function clearBoard(){
//     for(i=0;i<cells.length;i++){
//         cells[i].class = "cell";
//     }
// }

function paintBoard()
{   
    for(let i=0; i<cells.length;i++){
        cells[i].classList.remove("enemy");
    }
    for(let i=0; i<aliens.length; i++){
        cells[aliens[i]].classList.add("enemy");
    }
}

function moveHero(e){
    if(gameOver){
        return;
    }
    const hero = board.querySelector(".hero");
    const leftEdge = 210;
    const rightEdge = 224;
    if(e.code === "ArrowLeft" && parseInt(hero.id)>leftEdge)
    {
        hero.classList.remove("hero");
        hero.previousElementSibling.classList.add("hero");
    }
    if(e.code === "ArrowRight" && parseInt(hero.id)<rightEdge)
    {
        hero.classList.remove("hero");
        hero.nextElementSibling.classList.add("hero");
    }
}

function moveEnemy(){

    if(aliensLastColumn.some(item => item%width === width-1) && direction === 1){

        direction = -1;
        for(let i = 0;i<aliens.length; i++){
            aliens[i]+=width; 
        }
        console.log(direction);
        paintBoard();
        checkForLose();
        return;
    }
    if(aliensFirstColumn.some(item => item%width === 0) && direction === -1){
    
        direction = 1;
        for(let i = 0;i<aliens.length; i++){
            aliens[i]+=width; 
        }
        console.log(direction);
        paintBoard();
        checkForLose();
        return;
    }
    for(let i = 0;i<aliens.length; i++){
        aliens[i]+=direction; 
    }
    aliensFirstColumn = aliensFirstColumn.map(item => item+=direction); 
    aliensLastColumn = aliensLastColumn.map(item => item+=direction);
    paintBoard();
}

function checkForWin(){
    if(aliens.length === 0){
        gameOver = true;
        textCard.classList.remove("hide");
        textP.innerText = "What a glorious victory!";
        clearInterval(enemyInterval);
    }
}
function checkForLose(){
    for(let i = cells.length -1; i>= cells.length-width; i--){
        if(cells[i].classList.contains("enemy")){
            gameOver=true;
            clearInterval(enemyInterval);
            textCard.classList.remove("hide");
            textP.innerText = "What a loser lmao";
            return;
        }
    }
}
function shootLaser(e){
    if(gameOver){
        return;
    }
    if(e.code === "KeyZ"){
        const hero = document.querySelector(".hero");
        const heroId = hero.id;
        let laserId = heroId-width;
        cells[laserId].classList.add("laser");
        let laserMove = setInterval(()=>{
            cells[laserId].classList.remove("laser");
            laserId -=width;
            cells[laserId].classList.add("laser");
            if(cells[laserId].classList.contains("enemy")){
                clearInterval(laserMove);
                cells[laserId].classList.remove("enemy", "laser");
                aliens.splice(aliens.indexOf(laserId), 1);
                checkForWin();
            }
            if(laserId<15){
                clearInterval(laserMove);
                cells[laserId].classList.remove("laser");
            }
        }, 50);
        
    }
}
//createBoard();
 // uncomment to make teh enemies move


// implement moveEnemy and put it in a setInterval --------------done
// implement shootLaser and put it on "space" key  --------------done
// implement a check for win ------------------------------------done
// implement losing conditions ----------------------------------done
// implement start/restart buttons-------------------------------done
// implement instructions panel