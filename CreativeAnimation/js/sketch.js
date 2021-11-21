var particles = [];
var attractionPoint;

function setup() {
  createCanvas(600, 600);
  
  frameRate(60);
  
  attractionPoint = new AttractionPoint(createVector(width/2, height/2));

  for(let i = 0; i < 60; i++) {
    particles.push(new Particle(createVector(random(0, width), random(0, height))));
  }
  
}

function draw() {
  background(220, 220 , 220, 100);
  
  if (keyIsDown(LEFT_ARROW)) {
    shakeParticles();
  }

  attractionPoint.draw();
  
  for(let particle of particles) {
    checkForCollisions(particle);
    attractionPoint.applyGravitationalForce(particle);
    particle.update();
    particle.draw();
  }  
}

function checkForCollisions(particle) {
  for(let p of particles) {
    if(particle !== p) {
      particle.checkForCollision(p);
    }
  }
}

function shakeParticles() {
  for(let particle of particles) {
    particle.shake();
  }
}
