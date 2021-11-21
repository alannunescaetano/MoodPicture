class AttractionPoint {
    
  constructor(position, mass) {
    this.position = position;
    this.size = 5;
    this.mass = mass;
  }
  
  draw() {
    fill(100, 0, 250);

    ellipse(
      this.position.x,
      this.position.y,
      this.size
    )
  }
  
  applyGravitationalForce(particle) {
    let G = 1;

    let force = p5.Vector.sub(this.position, particle.position);
    let distanceSq = constrain(force.magSq(), 100, 1000);
 
    force.normalize();
    let strength = (G * this.mass * particle.mass) / distanceSq;
    force.setMag(strength);
    
    particle.applyForce(force);
  }
}