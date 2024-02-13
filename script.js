const outList = document.querySelector(".outList");
const arr = [];
for (let i = 0; i <= 3; i++) {
  arr.push([]);
  for (let j = 0; j <= 3; j++) {
    arr[i][j] = 0;
  }
}
function generateBlock() {
  const x = Math.floor(Math.random() * 4);
  const y = Math.floor(Math.random() * 4);
  console.log(x, y);
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
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
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
      rightMove();
    } else {
      leftMove();
    }
  } else {
    if (yDiff > 0) {
      downMove();
    } else {
      upMove();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

////////////////////////////////////////////////////////////////

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    upMove();
  } else if (e.key === "ArrowDown") {
    downMove();
  } else if (e.key === "ArrowRight") {
    rightMove();
  } else if (e.key === "ArrowLeft") {
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
