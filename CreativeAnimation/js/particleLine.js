class ParticleLine {
  constructor(positionY, attractionIntensity) {
    this.edgeLength = 220;
    this.positionY = positionY;
    this.particles = [];
    this.attractionPoint = new AttractionPoint(createVector(half, positionY), attractionIntensity);
    
    for(let i = 0; i < 1; i++) {
      let r = random(220, 290);
      this.particles.push(new Particle(createVector(r, positionY)));
    }
  }
  
  draw() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
      this.attractionPoint.draw();
    }
  }
  
  applyGravitationalForce() {
    for(let i = 0; i < this.particles.length; i++) {
      this.attractionPoint.applyGravitationalForce(this.particles[i]);
    }
  }
  
  applyFrictionFromEdges() {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyFrictionFromEdges(this.edgeLength);
    }
  }
  
  accelerateParticles(multiplier) {
    for(let i = 0; i < this.particles.length; i++) {
      this.particles[i].accelerate(multiplier);
    }
  }
}