var particleLines = [];
var attractionPoints=[];
var gravity;
var half = 300;

function setup() {
  createCanvas(600, 600);
  
  frameRate(60);
  
  for(let i = 0; i < 100; i=i+10) {
    particleLines.push(new ParticleLine(i, 1));
  }
}

function draw() {
  background(220, 220 , 220, 100);
  
  if (keyIsDown(LEFT_ARROW)) {
    accelerateParticles();
  }
  
  for(let particleLine of particleLines) {
    particleLine.applyGravitationalForce();
    particleLine.applyFrictionFromEdges();
    particleLine.draw();
  }  
}

function accelerateParticles() {
  for(let i = 0; i<particleLines.length;i++) {
    particleLines[i].accelerateParticles(1.51);
  }
}
