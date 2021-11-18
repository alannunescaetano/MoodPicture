

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
    this.position.add(this.velocity.limit(20));
  }
  
  applyFrictionFromEdges() {
    var frictionIntensity = map(
      p5.Vector.sub(createVector(half, half), this.position).mag(),
      0,
      half,
      0,
      1
    );

    var canvasQuarter = width/4;
    if(true) {
      if(frictionIntensity < 0)
         frictionIntensity = frictionIntensity * -1;

      Friction.applyFriction(this, frictionIntensity);
    }
  }
}

