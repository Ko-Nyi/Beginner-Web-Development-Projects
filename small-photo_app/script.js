var video,webCamStream;
var canvas, ctx, data, hiddenCanvas, hiddenctx;
var count = 0;  
var filter;
var startButton,stopButton,filterButton,clearButton,save;
function init(){
    video=document.querySelector('#video')

    startButton=document.querySelector('#start');
    startButton.addEventListener('click',start);

    stopButton=document.querySelector('#stop');
    stopButton.addEventListener('click',stop);

    filterButton=document.querySelector('#photo-filter');
    filterButton.addEventListener('change',filter);

    clearButton=document.querySelector('#clear-button');
    clearButton.addEventListener('click',clear);

    //---------------------
    // TAKE A SNAPSHOT CODE
    //---------------------
    // Get the  2 canvas and obtain a context for
    // drawing in it
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');

    hiddenCanvas = document.getElementById("myHiddenCanvas");
    hiddenctx = hiddenCanvas.getContext('2d');

    photos=document.querySelector('#photo');
    photos.addEventListener('click',takePhoto);

    save=document.querySelector('#save');
    save.addEventListener('click',savePhoto);
}
function start(){
    navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true
    }).then((stream)=>{
        video.srcObject=stream;
        video.play();
        webCamStream=stream;
    }).catch((error)=>{
        prompt('navigator.getUserMedia error: ',error);
    });
}
function stop(){
    webCamStream.getTracks()[0].stop();
    webCamStream.getTracks()[1].stop();
}
function filter(e){
    // Set filter to chosen option
    filter=e.target.value;
    // Set filter to video
    video.style.filter=filter;
    //set filter to photo
    ctx.filter=filter;
    e.preventDefault();
}
function clear(){
    filter="none";
    //clear filter
    video.style.filter=filter;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    e.preventDefault();
}
function takePhoto(){
    hiddenctx.drawImage(video, 0,0, hiddenCanvas.width, hiddenCanvas.height);
    ctx.drawImage(video, count,0, canvas.width/6, canvas.height);
    
    if(count>=600){
    count=0;
    } else {
    count = count + 120;
}
data = hiddenCanvas.toDataURL("image/png");
}

function savePhoto() {
    var link = document.createElement('a');
    link.download = "photo.png";
    link.href = data;
    link.click();
    }
