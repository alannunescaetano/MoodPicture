class AttractionPoint {
    
  constructor(position, attractionIntensity) {
    this.position = position;
    this.size = 1;
    this.mass = 60;
    this.attractionIntensity = attractionIntensity;
  }
  
  draw() {
    ellipse(
      this.position.x,
      this.position.y,
      this.size
    )
  }
  
  applyGravitationalForce(particle) {
    let gravity = 1;
    let force = p5.Vector.sub(this.position, particle.position);
    let distance = constrain(force.magSq(), 100, 1000);
    
    let gravitationalForce = gravity * (this.mass * particle.mass / distance);
    force.setMag(gravitationalForce);
    
    particle.applyForce(force);
  }
}