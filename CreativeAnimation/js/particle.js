

class Particle {
  constructor(position, radius = 3, velocity = createVector(0, 0), color) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = createVector(0, 0);
    this.radius = radius;
    this.mass = 100;
    this.color = color;
  }

  draw() {
    fill(this.color);

    ellipse(
      this.position.x,
      this.position.y,
      this.radius * 2
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

  checkForCollision(particle) {   
    var d = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

    // reposition to avoid the impact twice
    if (d < this.radius + particle.radius) {

      let reposition = p5.Vector.sub(this.position, particle.position);

      if (this.position.y < particle.position.y) {
        let dist = particle.position.y - this.position.y;
        reposition.y -= dist - (this.radius + particle.radius)
      } else if(this.position.y > particle.position.y) {
        let dist = this.position.y - particle.position.y;
        reposition.y += dist - (this.radius + particle.radius)
      }

      if (this.position.x < particle.position.x) {
        let dist = particle.position.x - this.position.x;
        reposition.x -= dist - (this.radius + particle.radius);
      } else if (this.position.x > particle.position.x) {
        let dist = this.position.x - particle.position.x;
        reposition.x += dist - (this.radius + particle.radius);
      }

      this.position.add(reposition);

      //change of direction      
      this.velocity.x = -this.velocity.x / 3;
      this.velocity.y = -this.velocity.y / 3;

      particle.velocity.x = -particle.velocity.x / 3;
      particle.velocity.y = -particle.velocity.y / 3;
    }
  }

  applyFriction() {
    let c = 0.01;
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);    
    friction.mult(c);

    this.applyForce(friction);
  }

  shake() {

    let force;

    switch (random(['1', '2', '3', '4'])) {
      case '1':
        force = createVector(0, 100);
        break;
      case '2':
        force = createVector(0, -100);
        break;
      case '3':
        force = createVector(100, 0);
        break;
      case '4':
        force = createVector(-100, 0);
        break;
      default:
        break;
    }

    this.applyForce(force);
  }

  reduceSize(rate) {
    this.radius -= rate;
  }

  isDead() {
    return this.radius <= 0;
  }
}

