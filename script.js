const outList = document.querySelector(".outList");
const arr = [];
const colors = [];
colors[4] = "#dcf3aa";colors[8] = "#aaf3b4";colors[16] = "#aaf3e0";colors[32] = "#aad0f3";colors[64] = "#b7aaf3";colors[128] = "#e0aaf3";
colors[256] = "#f3aae4";colors[512] = "#f3aaaa";colors[1024] = "#e9d58e";colors[2048] = "#b1e98e";colors[4096] = "#8ee9b2";
colors[8192] = "#8ed2e9";colors[16384] = "#998ee9";colors[32768] = "#e98ee6";colors[65536] = "#e98e8e";colors[131072] = "#37ece9";

for (let i = 0; i <= 3; i++) {
  arr.push([]);
  for (let j = 0; j <= 3; j++) {
    arr[i][j] = 0;
  }
}
function generateBlock() {
  const x = Math.floor(Math.random() * 4);
  const y = Math.floor(Math.random() * 4);
  if (arr[x][y] !== 0) {
    generateBlock();
  } else {
    arr[x][y] = 2;
    outList.insertAdjacentHTML(
      "beforeend",
      `<li id="row${x}col${y}" style="position: absolute; left: ${
        y * 77.5 + 10
      }px; top: ${x * 77.5 + 10}px;">2</li>`
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  generateBlock();
});

let touchstartX = 0;
let touchendX = 0;

////////////////////////////////////////////////////

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  evt.preventDefault();
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  evt.preventDefault();
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      combineLeft();
      leftMove();
    } else {
      combineRight();
      rightMove();
    }
  } else {
    if (yDiff > 0) {
      combineUp();
      upMove();
    } else {
      combineDown();
      downMove();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

////////////////////////////////////////////////////////////////

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    combineUp();
    upMove();
  } else if (e.key === "ArrowDown") {
    combineDown();
    downMove();
  } else if (e.key === "ArrowRight") {
    combineRight();
    rightMove();
  } else if (e.key === "ArrowLeft") {
    combineLeft();
    leftMove();
  } else {
    return;
  }
});

let c1 = 0;
function upMove() {
  for (let i = 3; i >= 1; i--) {
    for (let j = 0; j <= 3; j++) {
      if (arr[i - 1][j] === 0 && arr[i][j] !== 0) {
        arr[i - 1][j] = arr[i][j];
        arr[i][j] = 0;
        const block = document.getElementById(`row${i}col${j}`);
        block.style.top = `${parseFloat(block.style.top) - 77.5}px`;
        block.id = `row${i - 1}col${j}`;
        c1++;
        upMove();
        return;
      }
    }
  }
  if (c1 !== 0) {
    generateBlock();
    c1 = 0;
  }
}

let c2 = 0;
function downMove() {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      if (arr[i + 1][j] === 0 && arr[i][j] !== 0) {
        arr[i + 1][j] = arr[i][j];
        arr[i][j] = 0;
        const block = document.getElementById(`row${i}col${j}`);
        block.style.top = `${parseFloat(block.style.top) + 77.5}px`;
        block.id = `row${i + 1}col${j}`;
        c2++;
        downMove();
        return;
      }
    }
  }
  if (c2 !== 0) {
    generateBlock();
    c2 = 0;
  }
}

let c3 = 0;
function leftMove() {
  for (let i = 0; i <= 3; i++) {
    for (let j = 3; j >= 1; j--) {
      if (arr[i][j - 1] === 0 && arr[i][j] !== 0) {
        arr[i][j - 1] = arr[i][j];
        arr[i][j] = 0;
        const block = document.getElementById(`row${i}col${j}`);
        block.style.left = `${parseFloat(block.style.left) - 77.5}px`;
        block.id = `row${i}col${j - 1}`;
        c3++;
        leftMove();
        return;
      }
    }
  }
  if (c3 !== 0) {
    generateBlock();
    c3 = 0;
  }
}

let c4 = 0;
function rightMove() {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 2; j++) {
      if (arr[i][j + 1] === 0 && arr[i][j] !== 0) {
        arr[i][j + 1] = arr[i][j];
        arr[i][j] = 0;
        const block = document.getElementById(`row${i}col${j}`);
        block.style.left = `${parseFloat(block.style.left) + 77.5}px`;
        block.id = `row${i}col${j + 1}`;
        c4++;
        rightMove();
        return;
      }
    }
  }
  if (c4 !== 0) {
    generateBlock();
    c4 = 0;
  }
}

///////////////////////////////////////////////////////////////

window.addEventListener("scroll", preventMotion, false);
window.addEventListener("touchmove", preventMotion, false);

function preventMotion(event) {
  window.scrollTo(0, 0);
  event.preventDefault();
  event.stopPropagation();
}

////////////////////////////////////////////////////////////////

function combineUp() {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      if (arr[i][j] === 0) continue;
      for (let k = i + 1; k <= 3; k++) {
        if (arr[k][j] === 0) continue;
        if (arr[k][j] !== arr[i][j]) break;
        else if (arr[k][j] === arr[i][j]) {
          moveBlock(k, 1, i, j);
          c1 = 1;
          break;
        }
      }
    }
  }
}

function combineDown() {
  for (let i = 3; i >= 1; i--) {
    for (let j = 0; j <= 3; j++) {
      if (arr[i][j] === 0) continue;
      for (let k = i - 1; k >= 0; k--) {
        if (arr[k][j] === 0) continue;
        if (arr[k][j] !== arr[i][j]) break;
        else if (arr[k][j] === arr[i][j]) {
          moveBlock(k, 1, i, j);
          c2 = 1;
          break;
        }
      }
    }
  }
}

function combineLeft() {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 2; j++) {
      if (arr[i][j] === 0) continue;
      for (let k = j + 1; k <= 3; k++) {
        if (arr[i][k] === 0) continue;
        if (arr[i][k] !== arr[i][j]) break;
        else if (arr[i][k] === arr[i][j]) {
          moveBlock(k, 2, i, j);
          c3 = 1;
          break;
        }
      }
    }
  }
}

function combineRight() {
  for (let i = 0; i <= 3; i++) {
    for (let j = 3; j >= 1; j--) {
      if (arr[i][j] === 0) continue;
      for (let k = j - 1; k >= 0; k--) {
        if (arr[i][k] === 0) continue;
        if (arr[i][k] !== arr[i][j]) break;
        else if (arr[i][k] === arr[i][j]) {
          moveBlock(k, 2, i, j);
          c4 = 1;
          break;
        }
      }
    }
  }
}

function moveBlock(k, phase, i, j) {
  let num;
  arr[i][j] *= 2;
  if (phase === 1) {
    arr[k][j] = 0;
  } else {
    arr[i][k] = 0;
  }
  if (arr[i][j] > 10000) {
    num = `${parseInt(arr[i][j] / 1000)}k`;
  } else {
    num = arr[i][j];
  }
  const mainBlock = document.getElementById(`row${i}col${j}`);
  mainBlock.textContent = num;
  mainBlock.style.background = colors[arr[i][j]];
  let block;
  if (phase === 1) {
    block = document.getElementById(`row${k}col${j}`);
  } else {
    block = document.getElementById(`row${i}col${k}`);
  }
  block.parentNode.removeChild(block);
}
