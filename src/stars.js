// by Neill Bogie

let stars = []

function setup() {
	createCanvas(windowWidth, windowHeight);
	createStars()
}


function draw() { //called 60 times per second
	background('black')
	createLines()
	// for (let star of stars) {
	// 	drawStar(star)
	// }
	for (let star of stars) {
		moveStar(star)
	}
	text(mouseX, 100, 100)
}

//Create lines
function createLines() {
	stroke(255, 255, 255, 100)
	//for every star in stars 
	for (let star of stars) {
		//draw lines to nearby stars
		drawLinesToNearbyStars(star)
	}

}

function drawLinesToNearbyStars(centerStar) { //figure out which stars looking at
	//dist function that takes position of 2 things (p5 dist)
	let distanceThreshold = map(mouseX, 0, width, 10, 200, true)
	//loop - compare centerStar and 1 other star at a time to consider drawing a line 
	for (let star of stars) {
		let distance = dist(star.x, star.y, centerStar.x, centerStar.y)
		//check if lower than specified dist
		if (distance < distanceThreshold) {
			//if lower - draw lines between circles
			drawSparkyLine(star.x, star.y, centerStar.x, centerStar.y)

		}
	}

	//else - do nothing
}


function createStars() {
	for (let i = 1; i < 100; i++) {
		let star = {
			x: random(0, windowWidth),
			y: random(0, windowHeight),
			d: random(5, 50),
			speed: random(0, 7)
		}
		stars.push(star)
	}
}

function drawStar(star) {
	fill(0, 100)
	noStroke()
	circle(star.x, star.y, star.d);
}

function moveStar(star) {
	star.x += star.speed
	if (star.x >= width) {
		star.x = 0
	}
}

function drawSparkyLine(x1, y1, x2, y2) {
	strokeWeight(1);
	stroke(255,75);
	const numLines = 5;
	const noiseSize = 10;
	for (let i = 0; i < numLines; i++) {
		line(x1 + random(-noiseSize, noiseSize), y1 + random(-noiseSize, noiseSize), x2 + random(-noiseSize, noiseSize), y2 + random(-noiseSize, noiseSize))
	}
	stroke(255, 150);
	line(x1, y1, x2, y2)
}

function mousePressed() {
	if (isLooping()) {
		noLoop();
	} else {
		loop();
	}
}