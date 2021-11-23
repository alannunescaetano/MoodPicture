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
  background(220, 220 , 220, 50);

  noStroke();

  for(let cluster of clusters) {
    if (keyIsDown(LEFT_ARROW)) {
      cluster.shakeParticles();
    }

    cluster.update();
  }
}

function keyPressed() {
  for(let cluster of clusters) {
    cluster.shakeParticles();
  }
}
