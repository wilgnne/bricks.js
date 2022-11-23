const nickname = prompt("Nickname:");

const socket = io("ws://129.148.39.27:2001");

let data = {
  heigth: 20,
  width: 10,
  fruits: [],
  players: []
};
let id;

const BLOCK_SIZE = 15;

const FRUIT_COLOR_TABLE = {
  1: "#9AE19D",
  2: "#03CEA4",
  3: "#4A77BF",
  4: "#345995",
  5: "#F1D87E",
  6: "#EDCD5A",
  7: "#E9C235",
  8: "#CAA316"
}

socket.on("connect", () => {
  id = socket.id
  console.log(id)
  socket.emit("register", nickname);
})

socket.on("tick", (d) => {
  data = d
})

function drawWall() {
  for (let i = 0; i < data.width; i++) {
    for (let j = 0; j < data.heigth; j++) {
      fill('rgba(255, 255, 255, 0.10)');
      const fruit = data.fruits.find((fruit) => fruit.position.x === i && fruit.position.y === j)
      if (fruit)
        fill(FRUIT_COLOR_TABLE[fruit.score]);
      const player =  data.players.find((npc) => npc.position.x === i && npc.position.y === j)
      if (player) {
        if (player.id === id)
          fill('rgba(255, 255, 255, 1)');
        else
          fill('rgba(255, 255, 255, 0.50)');
      }

      rect(i * BLOCK_SIZE + i * 2 + 5, j * BLOCK_SIZE + j * 2 + 5, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}

function hank() {
  data.players.sort((a, b) => b.score - a.score).forEach((player, index) => {
    console.log(player)
    fill('rgba(255, 255, 255, 1)');
    text(`${index + 1} - ${player.name}: ${player.score}`, 200, 20 + (20 * index));
  })
}

function keyPressed() {
  if (key === "s" || key === "ArrowDown") {
    socket.emit("move", "N");
  } else if (key === "w" || key === "ArrowUp") {
    socket.emit("move", "S");
  } else if (key === "a" || key === "ArrowLeft") {
    socket.emit("move", "O");
  } else if (key === "d" || key === "ArrowRight") {
    socket.emit("move", "L");
  }
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('screen');
  frameRate(5);
  textFont("Arial");
  textSize(20);
}

function draw() {
  clear();
  hank();
  drawWall();
}
