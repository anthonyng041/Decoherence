let particles = [];
let numParticles = 4000; // Balanced for density and performance
let R; // Radius of the 3D shape
let globalRotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 18);
  
  // Scale the shape to fit nicely on any screen size
  R = min(width, height) * 0.35; 
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(i));
  }
}

function draw() {
  fill(10, 10, 18, 35);
  noStroke();
  rect(0, 0, width, height);
  
  // Decoherence tied to mouseX position (0.0 to 1.0)
  let decoherence = map(constrain(mouseX, 0, width), 0, width, 0, 1);
  
  // Slowly spin the entire shape along the horizontal axis
  globalRotation += 0.01;
  
  for (let p of particles) {
    p.update(decoherence, globalRotation);
    p.display();
  }
}

class Particle {
  constructor(i) {
    this.id = i;
    // Starting position mapped along the 3D path
    this.t = map(i, 0, numParticles, 0, TWO_PI);
    // Unique speed for each particle so they flow along the path
    this.speed = 0.005 + (i % 10) * 0.0005;
    
    // Unique Perlin noise offsets for organic, chaotic drift
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(2000);
    
    this.isCyan = i % 2 === 0;
    this.pos = createVector(0, 0);
  }
  
  update(decoherence, rot) {
    // Move particle along the path
    this.t += this.speed;
    
    // BASE 3D SHAPE (A 3D Knot)
    let x3d = R * sin(2 * this.t);
    let y3d = R * sin(3 * this.t);
    let z3d = R * cos(2 * this.t);
    
    // 3D ROTATION (Spinning horizontally & tilting)
    let tilt = PI / 6; // Tilt 30 degrees down for better perspective
    
    let yRotatedX = y3d * cos(tilt) - z3d * sin(tilt);
    let zRotatedX = y3d * sin(tilt) + z3d * cos(tilt);
    
    let xRotatedY = x3d * cos(rot) - zRotatedX * sin(rot);
    let yFinal = yRotatedX;
    
    // APPLY DECOHERENCE (The Vortex + Noise)
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    
    // Square the decoherence so it collapses aggressively at the end
    let chaosIntensity = pow(decoherence, 2); 
    
    // Perlin Noise for organic randomness
    let maxDrift = width * 0.3; 
    let driftX = map(noise(this.noiseOffsetX, this.id), 0, 1, -1, 1) * maxDrift;
    let driftY = map(noise(this.noiseOffsetY, this.id), 0, 1, -1, 1) * maxDrift;
    
    // Vortex Swirl Math (Polar Coordinates)
    // Find the current angle and distance from the center
    let currentAngle = atan2(yFinal, xRotatedY);
    let currentRadius = sqrt(xRotatedY * xRotatedY + yFinal * yFinal);
    
    // Spin the angle and expand the radius based on chaos intensity
    let vortexAngle = currentAngle + (chaosIntensity * 5); // 5 is the spin speed
    let vortexRadius = currentRadius * (1 + chaosIntensity * 2.5); // Push outward
    
    // Convert back to Cartesian (x,y)
    let swirlX = cos(vortexAngle) * vortexRadius;
    let swirlY = sin(vortexAngle) * vortexRadius;
    
    // C. Blend the ordered knot with the chaotic vortex
    let finalX = lerp(xRotatedY, swirlX + driftX, chaosIntensity);
    let finalY = lerp(yFinal, swirlY + driftY, chaosIntensity);
    
    // PROJECT TO 2D SCREEN
    this.pos.x = width / 2 + finalX;
    this.pos.y = height / 2 + finalY;
  }
  
  display() {
    if (this.isCyan) {
      stroke(100, 130, 255, 240); // Cyan
    } else {
      stroke(160, 100, 240, 220); // Violet
    }
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}

// Automatically adapt if the browser window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  R = min(width, height) * 0.35;
}