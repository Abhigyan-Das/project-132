prediction_1 = "";

Webcam.set ({
    width:350,
    height:300,
    img_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_img" src ="'+data_uri+'"/>';
    });
    
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8pSS5FlSc/model.json',modelLoaded);

function modelLoaded() {
    console.log('model loaded');
}

function check() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
    }

    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    
    prediction_1 = results[0].label;

    if(results[0].label == "Mask"){
        document.getElementById("update_emoji").innerHTML = "&#x1F637;";

    }

    if(results[0].label == "NoMask"){ 
        document.getElementById("update_emoji").innerHTML = "&#x26d4;";
        
    }

}