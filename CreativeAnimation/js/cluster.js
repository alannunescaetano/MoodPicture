
class Cluster {
    constructor(position, weight, particleColor) {
        this.position = position.copy();
        this.weight = weight;
        this.particles = [];
        this.initialParticleSpeed = 2;
        this.particleSpeed = this.initialParticleSpeed;
        this.temperature = 0;
        this.particleColor = particleColor;
    }

    update() {
        
        this.checkParticlesLifeTime();

        this.particleSpeed = this.particleSpeed <= this.initialParticleSpeed ? this.initialParticleSpeed :  this.particleSpeed - 0.01;

        for(let particle of this.particles) {

            particle.reduceSize(1);
            particle.applyFriction();
            particle.update();
            particle.draw();
        }
    }

    checkParticlesLifeTime() {
        if(!this.particles || this.particles.length == 0) {
            return;
        }

        for(let i = this.particles.length-1; i > 0; i--) {
            if(this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
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
            this.attractionPoint.disperseParticle(particle, 500);
        }
    }

    emitParticle() {
        let velocity = createVector(
            random(-1, 1),
            random(-1, 1)
        );

        velocity.setMag(this.particleSpeed);

        let particle = new Particle(
            this.position.copy(),
            this.weight,
            velocity,
            this.particleColor
        );

        this.particles.push(particle);
    }
}