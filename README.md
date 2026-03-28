# Decoherence
Artist: ant

Context: IFT 6256 – Final Vernissage

Professor: Benoit Baudry

## Concept
Decoherence is an algorithmic art piece that visualizes the quantum mechanics concept of the same name: the precise moment a system transitions from a unified, coherent state of superposition into a classical, chaotic state due to interaction with its environment.

Visually, the system begins in a state of order. A dense swarm of 4,000 particles forms a perfectly synchronized 3D Lissajous knot, rendered in a palette of cyan and violet. As "environmental noise" is introduced, the underlying math fractures. The particles decouple from their orbital paths, caught in a turbulent vortex driven by Perlin noise and polar coordinate transformations. What was once a singular, harmonious form violently tears apart into a cloud of glowing dust, only to re-cohere when the noise subsides.

## Variations & Interaction
This project includes three distinct variations of the core algorithm, allowing the piece to adapt to different exhibition constraints:

sketch.js: The decoherence variable is driven autonomously by an oscillating sine wave tied to the program's runtime. The piece smoothly breathes in and out of chaos, requiring no physical input from the audience.

sketch2.js (Mouse): The collapse of the system is manually controlled by mapping the viewer's mouse position along the horizontal axis to the chaos intensity multiplier.

sketch3.js (Audio Reactive Mode): This version utilizes the p5.sound library to capture ambient room noise via a microphone. The sounds captured by the mic acts as the environmental noise, physically tearing the visual structure apart when the room gets loud.

## Technical Details
Framework: Built using standard p5.js.

Dependencies: sketch3.js requires the inclusion of the p5.sound library to access microphone input.

Geometry: Base structure calculated via 3D parametric equations (Lissajous curve), projected onto a 2D canvas with a dynamic Y-axis rotation matrix.

Physics: Chaos state achieved by blending Cartesian noise offsets with Polar coordinate expansions (vortex effect) using linear interpolation.