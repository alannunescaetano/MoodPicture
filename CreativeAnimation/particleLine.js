class ParticleLine {
  constructor(positionY, attractionIntensity) {
    this.positionY = positionY;
    this.particles = [];
    this.attractionPoint = new AttractionPoint(createVector(half, positionY), attractionIntensity);
    
    for(let i = 0; i < 2; i++) {
      let r = random(220, 290);
      this.particles.push(new Particle(createVector(r, positionY)));
    }
  }
  
  draw() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
  }
  
  applyGravitationalForce() {
    for(let i = 0; i < this.particles.length; i++) {
      this.attractionPoint.applyGravitationalForce(this.particles[i]);
    }
  }
  
  applyFrictionFromEdges() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyFrictionFromEdges();
    }
  }
  
  accelerateParticles(multiplier) {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].accelerate(multiplier);
    }
  }
}