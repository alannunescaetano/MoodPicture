var clusters = [];
var particleTemperature = 0;
var sensorReadings;

var lastReadingUpdate = Date.now();
let readingUpdateInterval = 1.5 * 1000; //1 second
var readingIndex = 0;

let amplitudeButton;
let stressButton;

// Usar  mudança de formato

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createButtons();

  frameRate(60);
  
  var color = getParticleColor();

  clusters.push(new Cluster(createVector(width/2, 250), 100, color));
  clusters.push(new Cluster(createVector(width/2, 600), 170, color));

  Service.getSensorReadings((readings) => {
    this.sensorReadings = readings;
  });
}

function draw() {

  if(Date.now() - lastReadingUpdate > readingUpdateInterval) {
    lastReadingUpdate = Date.now();
    updateReadings();
  }

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
    particleTemperature -= 0.05;
  }
}

function updateReadings() {
  if(sensorReadings) {
    let reading = sensorReadings[readingIndex];
    console.log(reading)

    if(reading.MaxAmplitude > 100) {
      addAmplitude(2);
    } 
    
    if(reading.stress == 'stressed') {
      addStress(2);
    }

    if(reading.stress == 'residual_stress') {
      addStress(1);
    }

    readingIndex++;
    if(readingIndex >= sensorReadings.length) {
      readingIndex = 0;
    }
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

function addAmplitude(level) {
  for(let cluster of clusters) {
    if (cluster.particleSpeed <= 9) {
      cluster.particleSpeed += level;
    }
  }
}

function addStress(level) {
  if (particleTemperature <= 99) {
    particleTemperature += 10 * level;
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

