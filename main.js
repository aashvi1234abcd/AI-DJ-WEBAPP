var song="";
var scorerightwrist=0;
var scoreleftwrist=0;
var rightwristx=0;
var rightwristy=0;
var leftwristx=0;
var leftwristy=0;

function preload() {
    song=loadSound("Kamichi-Summer-Vibes.mp3");
}

function setup() {
    var canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();  
    posenet=ml5.poseNet(video,modelLoaded) ; 
    posenet.on("pose",gotposes);
}

function modelLoaded() {
    console.log("model is loaded you can continue this is the modelLoaded police congrats no ticket for you.");

}

function gotposes(results) {
    if (results.length>0) {
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video,0,0,600,500);
    fill("peach");
    stroke("peach");
    if (scorerightwrist>0.2) { 
        circle(rightwristx,rightwristy,20);
        if (rightwristy>0&&rightwristy<=100) {
           document.getElementById("speedvalue").innerHTML="Speed=0.5x";
           song.rate(0.5); 
        } 
        else if(rightwristy>100&&rightwristy<=200) {
            document.getElementById("speedvalue").innerHTML="Speed=1x";
            song.rate(1);
        }
        else if(rightwristy>200&&rightwristy<=300){
            document.getElementById("speedvalue").innerHTML="Speed=1.5x"
            song.rate(1.5);
        }
        else if(rightwristy>300&&rightwristy<=400){
            document.getElementById("speedvalue").innerHTML="Speed=2x"
            song.rate(2);
        }
        else if(rightwristy>400){
            document.getElementById("speedvalue").innerHTML="Speed=2.5x"
            song.rate(2.5);
        }
    }
    if (scoreleftwrist>0.2) {
       circle(leftwristx,leftwristy,20);
       leftwristyvalue=Number(leftwristy);
       leftwristyvaluend=floor(leftwristyvalue);
       volume=leftwristyvaluend/500;
       document.getElementById("volumevalue").innerHTML="Volume:"+volume;
       song.setVolume(volume); 
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}