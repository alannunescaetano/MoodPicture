var particles = [];
var attractionPoints = [];
let testingCollision = false;

function setup() {
  createCanvas(600, 600);
  
  frameRate(60);
  
  attractionPoints.push(new AttractionPoint(createVector(width/2, 100), 400));


  if(testingCollision) {
    testCollision();
  } else {
    for(let i = 0; i < 100; i++) {
      particles.push(new Particle(createVector(random(0, width), random(0, height))));
    }
  }
}

function testCollision() {
  particles.push(new Particle(createVector(100, 100)));
  particles.push(new Particle(createVector(200, 100)));
}

function draw() {
  background(220, 220 , 220, 100);
  
  if (keyIsDown(LEFT_ARROW)) {
    shakeParticles();
  }

  for(let attractionPoint of attractionPoints) {
    attractionPoint.draw();
    for(let particle of particles) {
      attractionPoint.applyGravitationalForce(particle);
    }
  }
  
  for(let particle of particles) {
    checkForCollisions(particle);
    particle.applyFriction();
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
