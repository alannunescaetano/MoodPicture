var clusters = [];

function setup() {
  createCanvas(600, 600);
  frameRate(60);
  
  clusters.push(new Cluster(createVector(200, 170), 100));
  clusters.push(new Cluster(createVector(200, 200), 100));
  clusters.push(new Cluster(createVector(200, 240), 10));
  clusters.push(new Cluster(createVector(200, 260), 10));
  clusters.push(new Cluster(createVector(170, 300), 100));
  clusters.push(new Cluster(createVector(230, 300), 100));
  clusters.push(new Cluster(createVector(170, 380), 100));
  clusters.push(new Cluster(createVector(230, 380), 100));
}

function draw() {
  blendMode(BLEND);
  background(0, 0 , 0, 100);

  blendMode(LIGHTEST);
  noStroke();

  for(let cluster of clusters) {
    if (keyIsDown(LEFT_ARROW)) {
      cluster.shakeParticles();
    }

    cluster.emitParticle();
    cluster.update();
  }
}

function keyPressed() {
  for(let cluster of clusters) {
    //cluster.shakeParticles();
    cluster.particleSpeed += 1;
    print(cluster.particleSpeed);

  }
}
