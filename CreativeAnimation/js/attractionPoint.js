class AttractionPoint {
    
  constructor(position) {
    this.position = position;
    this.size = 5;
    this.mass = 20;
  }
  
  draw() {
    ellipse(
      this.position.x,
      this.position.y,
      this.size
    )
  }
  
  applyGravitationalForce(particle) {
    let G = 0.4;

    let force = p5.Vector.sub(this.position, particle.position);
    let distance = force.mag();

    distance = constrain(distance, 5.0, 25.0);
 
    force.normalize();
    let strength = (G * this.mass * particle.mass) / (distance * distance);
    force.mult(strength);
    
    particle.applyForce(force);
  }
}