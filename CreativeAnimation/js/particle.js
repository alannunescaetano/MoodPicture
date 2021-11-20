

class Particle {
  constructor(position) {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = 4;
    this.mass = 1;
  }

  draw() {
    ellipse(
      this.position.x,
      this.position.y,
      this.size
    )
  }
  
  applyForce(force) {
    let accIncrement = p5.Vector.div(force, this.mass);
    this.acceleration.add(accIncrement);
  }
  
  accelerate(rate) {
    this.acceleration.mult(rate);
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity = this.velocity.limit(20);
    this.position.add(this.velocity);
  }
  
  applyFrictionFromEdges(edgeLength) {
    var frictionIntensity = map(
      p5.Vector.sub(createVector(half, half), this.position).mag(),
      0,
      half,
      0,
      1
    );

    let canvasFirstQuarter = edgeLength;
    let canvasLastQuarter = width - edgeLength;

    if(frictionIntensity < 0)
      frictionIntensity = frictionIntensity * -1;

    if(this.position.x < canvasFirstQuarter || this.position.x > canvasLastQuarter)
      Friction.applyFriction(this, frictionIntensity);
  }
}

