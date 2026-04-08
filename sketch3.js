let particles = [];
let numParticles = 4000; 
let R; 
let globalRotation = 0;

// Audio variables
let mic;
let smoothedVol = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 18);
  
  R = min(width, height) * 0.35; 
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(i));
  }
  
  // Initialize audio input
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  fill(10, 10, 18, 35);
  noStroke();
  rect(0, 0, width, height);
  
  // Get microphone volume
  let vol = mic.getLevel();
  
  // Smooth the volume reading so the visual transition isn't harsh/jittery
  smoothedVol = lerp(smoothedVol, vol, 0.1);
  
  // Map the smoothed volume to the decoherence level (0 to 1).
  let decoherence = map(smoothedVol, 0, 0.05, 0, 1, true);
  
  globalRotation += 0.01;
  
  for (let p of particles) {
    p.update(decoherence, globalRotation);
    p.display();
  }
}

class Particle {
  constructor(i) {
    this.id = i;
    this.t = map(i, 0, numParticles, 0, TWO_PI);
    this.speed = 0.005 + (i % 10) * 0.0005;
    
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(2000);
    
    this.isCyan = i % 2 === 0;
    this.pos = createVector(0, 0);
  }
  
  update(decoherence, rot) {
    this.t += this.speed;
    
    // BASE 3D SHAPE
    let x3d = R * sin(2 * this.t);
    let y3d = R * sin(3 * this.t);
    let z3d = R * cos(2 * this.t);
    
    // 3D ROTATION
    let tilt = PI / 6; 
    
    let yRotatedX = y3d * cos(tilt) - z3d * sin(tilt);
    let zRotatedX = y3d * sin(tilt) + z3d * cos(tilt);
    
    let xRotatedY = x3d * cos(rot) - zRotatedX * sin(rot);
    let yFinal = yRotatedX;
    
    // APPLY DECOHERENCE
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    
    let chaosIntensity = pow(decoherence, 2) * (width / 2); 
    let driftX = map(noise(this.noiseOffsetX, this.id), 0, 1, -1, 1) * chaosIntensity;
    let driftY = map(noise(this.noiseOffsetY, this.id), 0, 1, -1, 1) * chaosIntensity;
    
    // PROJECT TO 2D SCREEN
    this.pos.x = width / 2 + xRotatedY + driftX;
    this.pos.y = height / 2 + yFinal + driftY;
  }
  
  display() {
    if (this.isCyan) {
      stroke(100, 130, 255, 240); 
    } else {
      stroke(160, 100, 240, 220); 
    }
    strokeWeight(4); 
    point(this.pos.x, this.pos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  R = min(width, height) * 0.35;
}