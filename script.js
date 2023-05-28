var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image(); 
var pipeBottom = new Image();
var pipeUp = new Image();

bird.src = '/img/bird.png';
bg.src = '/img/bg.png';
fg.src = '/img/fg.png';
pipeBottom.src = '/img/pipeBottom.png';
pipeUp.src = '/img/pipeUp.png';

var fly = new Audio();
var scoreaudio = new Audio();
var score = 0;

fly.src = "/audio/fly.mp3";
scoreaudio.src = "/audio/score.mp3";

var gap = 90;


document.addEventListener('keydown' , moveUp)

function moveUp () {
    yPos -= 30;
    fly.play;
}

var pipe = [];

pipe [0] = {
    x : cvs.width,
    y : 0
}



//position bird
xPos = 10;
yPos = 150;
graw = 2;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for (var i = 0;i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x -= 2 ;

        if (pipe[i].x == 124){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height)-pipeUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
             || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
             || yPos + bird.height >= cvs.height - fg.height){
                location.reload();
             }
        
        if (pipe[i].x==4){
            score++;
            scoreaudio.play();
        }

    }



    
    ctx.drawImage(fg, 0 ,cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);


    yPos += graw;
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score:" + score, 10, cvs.height - 20 );
    requestAnimationFrame(draw);
}
pipeUp.onload = draw;
     
