var canvas, ctx;
var barWidth;
var linesToDraw;
var id;
var textBuffer = 20;
var block = 30;
var margin = 10;
var colors = ['#900','#090','#009','#990','#099','#909'];

var data = [
  [3,'cats'],
  [2,'dogs'],
  [9,'birds'],
  [4.5,'dinosaurs'],
  [12,'monkeys'],
  [1.5,'giraffes']
];

function init() {
  canvas = document.getElementById('histogram');
  ctx = canvas.getContext('2d');
  barWidth = (canvas.width / data.length) - margin;
  
  drawHistogram();
}

function drawHistogram() {
  cancelAnimationFrame(id);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawAxisLabels();
  linesToDraw = block * 12;
  
  id = requestAnimationFrame(drawBars);
}

function drawBars() {
  ctx.save();

  ctx.translate(20, canvas.height-20);

  for (var j=0; j<data.length; j++) {
    var currentLine = 360 - linesToDraw;
    ctx.fillStyle = colors[j];
    if (block*data[j][0] >= currentLine)
      ctx.fillRect(barWidth*j + margin*j,0,barWidth,-currentLine);
  }
  
  linesToDraw--;
  
  if (linesToDraw > 0) {
    id = requestAnimationFrame(drawBars);
  }
  
  ctx.restore();
}

function drawAxisLabels() {
  ctx.save();

  ctx.translate(20, canvas.height-20);

  for (var i=0; i<data.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillText(data[i][1], barWidth*i + margin*i + 5, 15);
  }

  for (var j=0; j<=12; j++) {
    ctx.fillStyle = 'black';
    ctx.fillText(j, -textBuffer, -j * block);  
  }
  
  ctx.restore();
}