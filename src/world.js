// Example solution to: 
// https://www.notion.so/neillzero/offset-a-3d-terrain-grid-with-perlin-noise-440a0bee9ff54bce82dad104a5e0bdc5
const gridHalfWidth = 40;
const cellSize = 10;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	// debugMode()
	const cam = createCamera();
	cam.setPosition(300, -200, 600)
	cam.lookAt(0, 0, 0)
	strokeWeight(0.3)
}



function draw() {
	background(30)
	
	//lights
	directionalLight(color('skyblue'), 0.4, 0.6, -0.4);
	ambientLight("#886655");
	
	//camera
	orbitControl(5, 5, 0.2);

	drawTerrain();

	drawCloudLayer({
		cloudHeight: -80,
		noiseScale: 0.004,
		noisePhase: 0,
		windSpeed: 0.01
	});
	
	drawCloudLayer({
		cloudHeight: -70,
		noiseScale: 0.0045,
		noisePhase: 1000,
		windSpeed: 0.013
	});

}

function drawTerrain() {
	const noiseScale = 0.007;
	for (let gridX = -gridHalfWidth; gridX < gridHalfWidth; gridX++) {
		for (let gridZ = -gridHalfWidth; gridZ < gridHalfWidth; gridZ++) {
			const x = gridX * cellSize;
			const z = gridZ * cellSize;
			// const t = frameCount/100;  //representing time
			const n = noise(12345 + x * noiseScale, 23456 + z * noiseScale);
			const colour = colourForNoise(n);
			const cellHeight = (-0.52 +Math.max(n, 0.5)) * -200; //height of each cell.  change this to be based on perlin noise at x,z
			const y = 0;
			push();
			translate(x, y+cellHeight/2, z)
			fill(colour);
			box(cellSize, cellHeight, cellSize);
			pop()
		}
	}
}

function drawCloudLayer({
	cloudHeight,
	noiseScale,
	noisePhase,
	windSpeed
}) {
	for (let gridX = -gridHalfWidth; gridX < gridHalfWidth; gridX++) {
		for (let gridZ = -gridHalfWidth; gridZ < gridHalfWidth; gridZ++) {
			const x = gridX * cellSize;
			const z = gridZ * cellSize;
			const t = noisePhase + windSpeed * frameCount; //representing time
			const n = noise(t + 77521 + x * noiseScale, 323456 + z * noiseScale);
			const y = cloudHeight;
			if (n < 0.65) {
				continue;
			}
			push();
			translate(x, y, z)
			fill("white");
			box(cellSize, cellSize, cellSize);
			pop()
		}
	}

}

function colourForNoise(n) {
	if (n > 0.8) {
		return "white";
	}
	if (n > 0.7) {
		return "gray";
	}
	if (n > 0.55) {
		return "green";
	}
	if (n > 0.5) {
		return "yellow";
	}
	if (n > 0.4) {
		return "skyblue";
	}

	return "navy";
}

function keyPressed() {
	//press space to reseed the perlin noise generator so that we get different values
	if (key === " ") {
		noiseSeed(millis());
	}
}