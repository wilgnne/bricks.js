let a = 0;

function setup() {
    var canvas = createCanvas(250, 250);
    canvas.parent('screen');
    frameRate(5);
}

function draw() {
    clear();

    for (let i = 0; i < 10; i++) {
        let index = Math.floor(random(0, 20))
        for (let j = 0; j < 20; j++) {
            fill('rgba(255, 255, 255, 0.25)');
            if (j === index)
                fill('rgba(255, 255, 255, 1)');
            rect(i*10 + i*2 + 5, j*10 + j*2 + 5, 10, 10);
        }
    }
}
