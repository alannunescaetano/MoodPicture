

class Particle {
  constructor(position, radius = 3, velocity = createVector(0, 0), color) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = createVector(0, 0);
    this.initialRadius = radius;
    this.radius = radius;
    this.mass = 100;
    this.color = color;
  }

  draw() {
    fill(this.color);

    let size = this.radius * 2;

    ellipse(
      this.position.x,
      this.position.y,
      size,
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
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  applyFriction() {
    let c = 0.01;
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);    
    friction.mult(c);

    this.applyForce(friction);
  }

  reduceSize(rate) {
    this.radius -= rate;
  }

  isDead() {
    return this.radius <= 0;
  }
}

