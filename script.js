const board = document.querySelector(".board");
const width = 15;
let aliens = [3,4,5,6,7,8,9,10,11,18,19,20,21,22,23,24,25,26,33,34,35,36,37,38,39,40,41];
let cells = [];

document.addEventListener("keydown", moveHero);

function createBoard(){
    for(let i =0; i<width*width; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cells.push(cell);
        board.appendChild(cell);
    }
    paintBoard()
    cells[217].classList.add("hero");
}

function paintBoard()
{
    for(let i=0; i<aliens.length; i++){
        cells[aliens[i]].classList.add("enemy");
    }
}

function moveHero(e){
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

createBoard();

// implement moveEnemy and put it in a setInterval
// implement shootLaser and put it on "space" key
// implement enemyDed function
// implement a check for win
// implement losing conditions