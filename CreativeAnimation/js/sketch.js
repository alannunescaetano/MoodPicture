var clusters = [];
var particleTemperature = 0;

let amplitudeButton;
let stressButton;

let once = true;

// Usar  mudança de formato

function setup() {
  createCanvas(windowWidth, windowHeight);
  createButtons();

  frameRate(60);
  
  var color = getParticleColor();

  clusters.push(new Cluster(createVector(width/2, 250), 100, color));
  clusters.push(new Cluster(createVector(width/2, 600), 170, color));
}

function draw() {


  

  blendMode(BLEND);
  background(0, 0, 0, 100);

  blendMode(LIGHTEST);
  drawSilhoutte();

  noStroke();
  
  for(let cluster of clusters) {
    cluster.particleColor = getParticleColor();
    cluster.emitParticle();
    cluster.update();
  }

  if(particleTemperature > 0) {
    particleTemperature -= 0.2;
  }
}

function createButtons() {
  stressButton = createButton('Add stress');
  stressButton.position(0, 0);
  stressButton.mousePressed(addStress);

  amplitudeButton = createButton('Add amplitude');
  amplitudeButton.position(0, 30);
  amplitudeButton.mousePressed(addAmplitude);
}

function addAmplitude() {
  for(let cluster of clusters) {
    if (cluster.particleSpeed <= 9) {
      cluster.particleSpeed += 1;
    }
  }
}

function addStress() {
  if (particleTemperature <= 99) {
    particleTemperature += 10;
  }
}

function getParticleColor() {
  let blue = map(particleTemperature, 100, 0, 0, 255);
  let red = 255 - blue;

  let proximityToMidTemperature = particleTemperature - 100;
  if(proximityToMidTemperature < 0) {
    proximityToMidTemperature = proximityToMidTemperature * -1;
  }

  let green = map(proximityToMidTemperature, 0, 50, 0, 255);
  
  return color(red, green, blue);
}

function drawSilhoutte() {

  fill(170, 170, 170);
  noStroke();
  ellipse(width/2, 250, 220);

  square(width/2 - 350/2, 400, 350, 90, 90, 0, 0);
}