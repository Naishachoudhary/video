status = '';
objects = [];


function setup() {
    canvas = createCanvas(600,380);
    canvas.center();
    video.hide();

}

function preload(){
    video = createVideo("video.mp4")
}

function start() {
    objectDetector = ml5.objectDetector('coocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}


function gotResult(error,result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function draw() {
    image(video,0,0,600,380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for (i=0 ; i<objects.length ; i++) {
            document.getElementById('status').innerHTML = "Status : Objects detected ";
            document.getElementById('no_object').innerHTML = "Number of Objects detected are : "+objects.length;
            
            fill("#568ee8");
            noFill();
            stroke("#568ee8");
            percent = floor(objects[i].cofidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
        }
    }
}