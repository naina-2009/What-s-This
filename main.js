objects = [];
status = "";
speak_this = "";

function preload()
{}

function setup()
{
    canvas = createCanvas(500,500)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : DETECTING OBJECTS";
}

function modelLoaded()
{
    console.log("MODEL IS SUCCESSFULLY LOADED!")
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 500, 500);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : OBJECT DETECTED!";
            fill("#FFC300");
            text(objects[i].label + " " + objects[i].confidence*100 + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FFC300");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            speak();
        }
    }
}

function speak()
{
    var speechSynthesis = window.speechSynthesis;
    speak_this = object[i].label;
    var utterThis = new SpeechSynthesisUtterance (speak_this);
    speechSynthesis.speak(utterThis);
    speak_this = "";
}