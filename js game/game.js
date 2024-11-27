let board;
let boardheight = 650;
let boardwidth= 350;
let context;


let manheight = 80;
let manwidth= 50;
let manx= 145;
let many= boardheight-manheight;
let manimg;

let man ={
    x:manx,
    y:many,
    width: manwidth,
    height:manheight
}


let obsarray = [];

let obs1width=500;
let obs2width=500;
let obs3width=500;

let obsheight =120;
let obsx=5;
let obsy= 10;

let obs1img;
let obs2img;
let obs3img;

let velovityx= 0;
let velocityy= 4;
let gravity= 4;
let vel = 0;

let gameover=false;
let score =0;


window.onload = function(){
    board = document.getElementById("jump");
    board.height=boardheight;
    board.width=boardwidth;

    context=board.getContext("2d");

    manimg = new Image();
    manimg.src="man.jpg";
    manimg.onload = function(){
    context.drawImage(manimg,man.x,man.y,man.width,man.height);
    }

    obs1img = new Image();
    obs1img.src="obs1.jpg";

    obs2img = new Image();
    obs2img.src="obs1.jpg";

    obs3img = new Image();
    obs3img.src="obs1.jpg";

    requestAnimationFrame(update);

    setInterval(placeobstacle,1000);

    document.addEventListener("keydown",move);

    document.addEventListener("Space",move);

}

function update() {
    requestAnimationFrame(update);

    if (gameover) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    vel += gravity;

    man.y = Math.min(man.x + vel, many);

    context.drawImage(manimg, man.x, man.y, man.width, man.height);

    for (let i = 0; i < obsarray.length; i++) {
        let obs = obsarray[i];
        obs.y += velocityy;
        context.drawImage(obs.img, obs.x, obs.y, obs.width, obs.height);

        if (collision(man, obs)) {
            gameover = true;
        }
    }

    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}


function move(e)
{
    if(gameover)
    {
        return;
    }
    if((e.code == "space" ||e.code =="ArrowUp") && man.y == many )
    {
        vel = 5;
    }

}

function placeobstacle()
{

    if(gameover)
    {
        return;
    }

    let obs ={
        img:null,
        x:obsx,
        y:obsy,
        width:null,
        height: obsheight
    }


    let placechance=Math.random();

    if(placechance>.90)
    {
        obs.img=obs1img;
        obs.width=obs1width;
        obsarray.push(obs);
    }

    else if(placechance>.70)
    {
        obs.img=obs2img;
        obs.width=obs2width;
        obsarray.push(obs);
    }

    else if(placechance>.50)
    {
        obs.img=obs3img;
        obs.width=obs3width;
        obsarray.push(obs);
    }



    if(obsarray.length > 5){
        obsarray.shift();
    }

}

function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}