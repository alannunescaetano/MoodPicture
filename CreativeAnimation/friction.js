class Friction {
  static applyFriction(particle, frictionIntensity) {
    var speed = particle.velocity.mag();
    var frictionMagnitude = frictionIntensity * speed * speed;
    
    var friction = createVector(particle.velocity.x, particle.velocity.y);
    friction.mult(-1);
    friction.normalize();
    friction.mult(frictionMagnitude);
    
    particle.applyForce(friction);
  }
}