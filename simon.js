let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

let h2 = document.querySelector("h2");
h2.innerText = `Click or Touch anywhere to start. (High Score: ${highestScore})`;

// Touch aur Click dono handle karne ke liye
function startGame() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
}

// Mobile touch & Laptop click support
document.addEventListener("pointerdown", function (e) {
    // Agar click button par nahi hua tabhi game start karein
    if (!e.target.classList.contains("btn")) {
        startGame();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
}

function playSequence() {
    let i = 0;
    let timer = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        i++;

        if (i >= gameSeq.length) {
            clearInterval(timer);
        }
    }, 600);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} (High Score: ${highestScore})`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    
    // Naya level aane par poori sequence play karne ke liye:
    setTimeout(playSequence, 500);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Touch or Click anywhere to restart.`;
        document.querySelector("body").style.backgroundColor = "#ef4444";
        
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#0f172a";
        }, 200);
        
        reset();
    }
}

function btnPress() {
    if (!started) return;
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}