song = ""

function preload(){
song = loadSound("music.mp3")
}
rightWristX=0
rightWristY=0

leftWristX=0
leftWristY=0

rightWristScore = 0
leftWristScore = 0



function setup(){
    canvas =createCanvas(600,500)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose',gotPoses)
}
function draw(){
    image(video,0,0,600,500)

    fill("red")
    stroke("black")
    if(leftWristScore>0.2){
circle(leftWristX,leftWristY,20)
numerical =Number(leftWristY)
integer =floor(numerical)
volume =integer/500
song.setVolume(volume)
document.getElementById("volume").innerHTML="volume"+volume
    }
    if(rightWristScore>0.2){
        circle(rightWristX,rightWristY,20)
        if (rightWristY>0 && rightWristY<=100) {
            document.getElementById("speed").innerHTML="Speed:0.5x"
            song.rate(0.5)
        } else if (rightWristY>100 && rightWristY<=200) {
            document.getElementById("speed").innerHTML="Speed:1.0x"
            song.rate(1.0)
        } else if (rightWristY>200 && rightWristY<=300) {
            document.getElementById("speed").innerHTML="Speed:1.5x"
            song.rate(1.5)
        } else if (rightWristY>300 && rightWristY<=400) {
            document.getElementById("speed").innerHTML="Speed:2.0x"
            song.rate(2.0)
        } else if (rightWristY>400 && rightWristY<=500) {
            document.getElementById("speed").innerHTML="Speed:2.5x"
            song.rate(2.5)
        }
            
        
            
        
    }



}

function play_sound(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
function modelLoaded(){
console.log('PoseNet is Initialized ')
}
function gotPoses(results){
 if(results.length>0)
 {
console.log(results)

leftWristScore= results[0].pose.keypoints[9].score
leftWristX=results[0].pose.leftWrist.x

leftWristY=results[0].pose.leftWrist.y 
console.log("leftWristX", leftWristX,"leftWristY",leftWristY)

rightWristX=results[0].pose.rightWrist.x 
rightWristY=results[0].pose.rightWrist.y

console.log ("rightWristX", rightWristX ,"rightWristY",rightWristY)

 }
}