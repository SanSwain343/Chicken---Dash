const chicken = document.getElementById("chicken");
const hole = document.getElementById("hole");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let isJumping = false;
let chickenLeft = 20;

highScoreDisplay.textContent = highScore;

// Hole animation
function moveHole() {
  let holeLeft = window.innerWidth;
  hole.style.left = holeLeft + "px";

  const holeInterval = setInterval(() => {
    holeLeft -= 5;
    hole.style.left = holeLeft + "px";

    // Collision
    const holeBottom = parseInt(hole.style.bottom) || 0;
    const holeTop = holeBottom + hole.offsetHeight;
    const chickenBottom = parseInt(chicken.style.bottom) || 0;
    const chickenRight = chickenLeft + chicken.offsetWidth;

    if (
      holeLeft < chickenRight &&
      holeLeft + hole.offsetWidth > chickenLeft &&
      chickenBottom < 50
    ) {
      clearInterval(holeInterval);
      gameOver();
    }

    if (holeLeft + hole.offsetWidth < 0) {
      clearInterval(holeInterval);
      score++;
      scoreDisplay.textContent = score;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = highScore;
      }
      moveHole();
    }
  }, 20);
}

document.getElementById("jumpBtn").addEventListener("click", () => {
  if (isJumping) return;
  isJumping = true;
  chicken.style.bottom = "120px";
  chickenLeft += 30;
  chicken.style.left = chickenLeft + "px";

  setTimeout(() => {
    chicken.style.bottom = "50px";
    setTimeout(() => (isJumping = false), 300);
  }, 300);
});

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

function gameOver() {
  alert("Game Over! Your score was: " + score);
  score = 0;
  scoreDisplay.textContent = score;
  chickenLeft = 20;
  chicken.style.left = chickenLeft + "px";
  moveHole();
}

moveHole();
