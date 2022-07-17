const score=document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

console.log(score);
startScreen.addEventListener('click',start);

let keys={ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false}
//to know which key is bieng pressed:

let player = {speed:5,score:0};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

//when key is pressed:
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(e);
    // console.log(e.key);
    // console.log(keys);
}

//when key is realised:
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(keys);
    // console.log(e.key);
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom+5<bRect.top)||(aRect.top-5>bRect.bottom)||
        ((aRect.right-10)<bRect.left)||(aRect.left+10>bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    // element_variable.forEach(function(value index arr){}) : general format 
    lines.forEach(function(item){

        // taking the lines back to the top after reaching the bottom of hte road

        if(item.y>=700){
            item.y -=750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.style.backgroundColor = "rgba(238, 82, 83,0.5)";
    startScreen.innerHTML = "GAME OVER! <br> Your final score is " + player.score
    + "<br>Press here to restart the Game!"
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        
        //if collision has occurred b/w the enemy and your car
        if(isCollide(car,item)){
            console.log("COLLISION!!");
            endGame();
        }

        if(item.y>=750){
            item.y = -300;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }

        item.y += player.speed;
        
        item.style.top = item.y + "px";
    })
}

function moveYourCar(){
    let road = gameArea.getBoundingClientRect();
    let car = document.querySelector('.car');
    //- means going up, + means going down
    if(keys.ArrowUp &&player.y>(road.top+70)){player.y -= player.speed}
    if(keys.ArrowDown && player.y<(road.bottom-80)){player.y+=player.speed}

    //- means going left,+ means going right
    if(keys.ArrowLeft && player.x>0){player.x-=player.speed}
    if(keys.ArrowRight && player.x<(road.width-50)){player.x+=player.speed}
    
    //Actual movement of the car:
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
}

function showScore(){
    player.score++;
    let ps = player.score -1;
    score.innerText = "Score:" + ps;
}

function gamePlay(){
    // console.log("i am clicked!");
    //creating the road(sadak) of the game
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    let car = document.querySelector('.car');
    
    //game will start only when the player is ready
    //i.e player.start == True
    //game starting : requestAnimationFrame(callback)
    if(player.start){
        
        moveLines();//for moving the lines of the road
        moveEnemy(car); //for moving the enemy cars
        moveYourCar();//for moving your car with user having control using up,down,left,right keys!

        
        //for giving continous animation(moving road):
        window.requestAnimationFrame(gamePlay);
        
        //to show the score on the screen
        showScore();
    }
}

function style_enemy(car){
    let num = Math.floor(Math.random()*10);
    if(num==0) car.style.backgroundImage = "url('car2.png')";
    else if(num==1 ) car.style.backgroundImage = "url('car3.png')";
    else if(num==2 ) car.style.backgroundImage = "url('car4.png')";
    else if(num==3) car.style.backgroundImage = "url('car5.png')";
    else if(num==4) car.style.backgroundImage = "url('car6.png')";
    else if(num==5) car.style.backgroundImage = "url('car7.png')";
    else if(num==6)car.style.backgroundImage = "url('car8.png')";
    else if(num==7) car.style.backgroundImage = "url('car9.png')";
    else if(num==8) car.style.backgroundImage = "url('car10.png')";
    else  car.style.backgroundImage = "url('car11.png')";    

    car.style.height=90 + "px";
}
//at the start of the game:
function start(){
    //To hide the main options window for starting the game:
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    gameArea.innerHTML = "";
    //to confirm that the given player has started!
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
    //for creating road lines:
    for(x=0;x<5;x++)
    {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = x*150;
        roadLine.style.top = roadLine.y+"px";
        //1 line: 0-100px ; 2 line: 150-250px; 3 line: 300-400px; 4 line: 450-550px; 5 line: 600-700px;
        gameArea.appendChild(roadLine);
        
    }
    

    // for creating cars:
    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    
    //initial position of the car
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    //create enemy cars
    for(x=0;x<4;x++)
    {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1)*250) * -1;
        enemyCar.style.top = enemyCar.y+"px";
        
        gameArea.appendChild(enemyCar);
        enemyCar.style.left = Math.floor(Math.random()*350)+"px";
        style_enemy(enemyCar);
        
    }
    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);
}

// gameArea has : road,roadlines,your car,enemy car;
// all the above are made in javaScript,therefor there is no need of hiding the gameArea class in function start()!
// therefore : gameArea.innerHTML = "" is correct !!
