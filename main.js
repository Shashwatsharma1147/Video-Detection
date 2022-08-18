
Status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("status").innerHTML = "status = detecting object";
}
function modelLoaded() {
    console.log("model is loaded");
    Status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log("Error");
    }
    else {
        console.log(result);
        objects = result;
    }
}
function draw() {
    image(video, 0, 0, 380, 380);

    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected are:"+objects.length;
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }

}