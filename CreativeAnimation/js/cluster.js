
class Cluster {
    constructor(position, weight) {
        this.attractionPoint = new AttractionPoint(position, weight);
        this.particles = [];
        
        for(let i = 0; i < weight; i++) {
            this.particles.push(
                new Particle(
                    createVector(
                        random(position.x - 200, position.x + 200),
                        random(position.y - 200, position.y + 200)
                    ),
                )
            ) 
        }
    }

    update() {
        this.attractionPoint.draw();
          
        for(let particle of this.particles) {
            this.attractionPoint.applyGravitationalForce(particle);
            this.checkForCollisions(particle);
            particle.applyFriction();
            particle.update();
            particle.draw();
        }
    }

    checkForCollisions(particle) {
        for(let p of this.particles) {
          if(particle !== p) {
            particle.checkForCollision(p);
          }
        }
      }
      
    shakeParticles() {
        for(let particle of this.particles) {
            particle.shake();
        }
    }
}