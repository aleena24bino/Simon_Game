let gameSeq = [];
let userSeq = [];
let score = [];

let btns = ['yellow','red','purple','green']

let started = false;
let level = 0;

let h3 = document.querySelector('h3');
let h4 = document.querySelector('h4');
let body = document.querySelector('body');

document.addEventListener("keypress", function(){
    setTimeout( function(){
        if (started == false){
            let sound = new Audio("game.mp3");
            sound.play();
            console.log("Game started");
            started = true;

            levelUp();
        }
    },500);
})

function gameFlash(btn){
    btn.classList.add('gameflash');
    setTimeout(function(){
        btn.classList.remove('gameflash');
    }, 250);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    }, 250);
}


function levelUp(){
    userSeq = [];
    level++;
    //console.dir(h3);
    h3.innerText = `Level ${level}`;
    let randomId = Math.floor(Math.random()*4);
    let randomColor = btns[randomId];
    let randomBtn = document.querySelector(`.${randomColor}`)

    gameSeq.push(randomColor);
    console.log(`Game seq: ${gameSeq}`);
     setTimeout(function(){
        gameFlash(randomBtn);
    }, 1500);
}


function checkAns(index){
    console.log("curr level :",level)
    if(userSeq[index] == gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
        console.log("same value");
    }else{
        if ( started == true){
            let sound = new Audio("danger_warning.mp3");
            sound.play();
            score.push(level-1);
            h3.innerHTML = `Game Over!  Your score was <b>${level-1}</b> <br>Press any key to start`;
            console.log("Game Over");
            body.classList.add('error');
            reset();
        }
}
}



function btnpress(){
    //console.dir(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    console.log(`User Seq: ${userSeq}`);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click", btnpress);
}

function reset(){
    setTimeout(function(){
        body.classList.remove('error');
    }, 1000);
    let hscore = score.reduce((max,ele) =>{
        if (ele>max){
            return ele;
        }else{
            return max;
        }
    });
    h4.innerText = `Highest Score: ${hscore}`;
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
}