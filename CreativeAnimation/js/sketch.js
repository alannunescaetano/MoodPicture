var particles = [];
var attractionPoint;
let testingCollision = false;

function setup() {
  createCanvas(600, 600);
  
  frameRate(60);
  
  attractionPoint = new AttractionPoint(createVector(width/2, height/2));

  if(testingCollision) {
    testCollision();
  } else {
    for(let i = 0; i < 500; i++) {
      particles.push(new Particle(createVector(random(0, width), random(0, height))));
    }
  }
}

function testCollision() {
  particles.push(new Particle(createVector(100, 100)));
  particles.push(new Particle(createVector(200, 100)));

  //particles[0].applyForce(createVector(0.3, 0));
  //particles[1].applyForce(createVector(-0.2, 0));
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
