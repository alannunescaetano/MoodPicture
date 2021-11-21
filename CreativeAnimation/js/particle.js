

class Particle {
  constructor(position) {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = 10;
    this.mass = 1;
  }

  draw() {
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
  }

  checkForCollision(particle) {   
    var d = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

    // reposition to avoid the impact twice
    if (d < this.radius + particle.radius) {
      let reposition = p5.Vector.sub(this.position, particle.position);

      if (this.position.x < particle.position.x) {
        let dist = particle.position.x - this.position.x;
        reposition.x -= dist - (this.radius + particle.radius);
      } else if (this.position.x > particle.position.x) {
        let dist = this.position.x - particle.position.x;
        reposition.x += dist - (this.radius + particle.radius);
      }

      if (this.position.y < particle.position.y) {
        let dist = this.position.y - particle.position.y;
        reposition.y -= dist - (this.radius + particle.radius)
      } else if(this.position.y > particle.position.y) {
        let dist = particle.position.y - this.position.y;
        reposition.y += dist - (this.radius + particle.radius)
      }
     
      this.position.add(reposition);

      //change of direction
      let velocityChange = p5.Vector.sub(this.velocity, particle.velocity);
      print("velocityChange: "+velocityChange)

      print("antes this: "+this.velocity)
      print("antes particle: "+particle.velocity)

      if (this.velocity.x < particle.velocity.x) {
        this.velocity.x -= velocityChange.x;
        particle.velocity.x += velocityChange.x;
      } else if (this.velocity.x > particle.velocity.x) {
        this.velocity.x += velocityChange.x;
        particle.velocity.x -= velocityChange.x;
      }

      if (this.velocity.y < particle.velocity.y) {
        this.velocity.y -= velocityChange.y;
        particle.velocity.y += velocityChange.y;
      } else if (this.velocity.y > particle.velocity.y) {
        this.velocity.y += velocityChange.y;
        particle.velocity.y -= velocityChange.y;
      }

      this.acceleration = createVector(0, 0);
      particle.acceleration = createVector(0, 0);

      print("depois this: "+this.velocity)
      print("depois particle: "+particle.velocity)
    }
  }

  shake() {
    
  }
}

