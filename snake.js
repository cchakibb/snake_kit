const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tile = 40; // 20 * 20
let direction = "e"; // n s w e
let apple = [5, 5];
let score = 0;
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0] * tile, apple[1] * tile, tile, tile);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let body of snake) {
    ctx.fillRect(body[0] * tile, body[1] * tile, tile, tile);
  }
};

const gameOver = () => {
  if (snake[0][0] > 19 || snake[0][0] < 0 || snake[0][1] > 19 || snake[0][1] < 0) {
    return true;
  } else {
    const [head, ...body] = snake;
    for (let bodyPart of body) {
      if (head[0] === bodyPart[0] && head[1] === bodyPart[1]) {
        return true;
      }
    }
  }
  return false;
};

window.addEventListener("keydown", (evt) => {
  switch (evt.key) {
    case "ArrowUp": {
      direction = "n";
      break;
    }
    case "ArrowDown": {
      direction = "s";
      break;
    }
    case "ArrowLeft": {
      direction = "w";
      break;
    }
    case "ArrowRight": {
      direction = "e";
      break;
    }
  }
});

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case "e": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "w": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case "n": {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case "s": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
  }

  const generateApple = () => {
    score++;
    const [x, y] = [Math.trunc(Math.random() * 19), Math.trunc(Math.random() * 19)];
    for (let body of snake) {
      if (body[0] === x || body[1] === y) {
        return generateApple();
      }
    }
    apple = [x, y];
  };

  snake.unshift(head);
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple();
  } else {
    snake.pop();
  }

  return gameOver();
};

const drawScore = () => {
  ctx.fillStyle = "white";
  ctx.fillText(score, tile, tile);
  ctx.font = "40px arial";
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawApple();
    drawScore();
    drawSnake();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 300);
  } else {
    alert("You lost");
  }
};

requestAnimationFrame(move);
