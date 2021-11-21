class AttractionPoint {
    
  constructor(position) {
    this.position = position;
    this.size = 5;
    this.mass = 500;
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
    let distance = force.magSq();
    
    let gravitationalForce = gravity * (this.mass * particle.mass / distance);
    force.setMag(gravitationalForce);
    
    particle.applyForce(force);
  }
}