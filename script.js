const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const container = document.querySelector(".buttons");

// Diagonal zig-zag angle sequence
const diagonalSequence = [0, 90, 180, 45, 270, 135, 30, 225, 60, 315, 120, 300, 150, 210, 330, 240];

// Distances for each move
const distances = [0.6, 0.8, 1];

let angleIndex = 0;
let distanceIndex = 0;
let lastAngle = null;

function moveNoButton() {
  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  // Current button center
  let btnX = noBtn.offsetLeft + noBtn.offsetWidth / 2;
  let btnY = noBtn.offsetTop + noBtn.offsetHeight / 2;

  // Pick next angle and make sure it's not the same as last
  let angleDeg = diagonalSequence[angleIndex];
  if (angleDeg === lastAngle) {
    angleIndex = (angleIndex + 1) % diagonalSequence.length;
    angleDeg = diagonalSequence[angleIndex];
  }

  const percent = distances[distanceIndex];
  let rad = (angleDeg * Math.PI) / 180;

  // Proposed movement
  let moveX = Math.cos(rad) * percent * maxX;
  let moveY = Math.sin(rad) * percent * maxY;

  let newX = btnX + moveX;
  let newY = btnY + moveY;

  // Flip X if outside container
  if (newX - noBtn.offsetWidth / 2 < 0 || newX + noBtn.offsetWidth / 2 > container.clientWidth) {
    moveX = -moveX;
    newX = btnX + moveX;
  }

  // Flip Y if outside container
  if (newY - noBtn.offsetHeight / 2 < 0 || newY + noBtn.offsetHeight / 2 > container.clientHeight) {
    moveY = -moveY;
    newY = btnY + moveY;
  }

  // Clamp to container
  newX = Math.max(noBtn.offsetWidth / 2, Math.min(maxX + noBtn.offsetWidth / 2, newX));
  newY = Math.max(noBtn.offsetHeight / 2, Math.min(maxY + noBtn.offsetHeight / 2, newY));

  // Apply new position
  noBtn.style.left = `${newX - noBtn.offsetWidth / 2}px`;
  noBtn.style.top = `${newY - noBtn.offsetHeight / 2}px`;

  // Update indices for next move
  lastAngle = angleDeg;
  angleIndex = (angleIndex + 1) % diagonalSequence.length;
  distanceIndex = (distanceIndex + 1) % distances.length;
}

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile touch
noBtn.addEventListener("touchstart", moveNoButton);

// Yes button click
yesBtn.addEventListener("click", () => {
  message.innerHTML = "YAYYYY!! 💕🥰 I knew you’d say yes!";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
});

///trapping 

let trappedTimer = null;
let isTrapped = false;

// Emojis/text
const trappedYesText = "YES 😛"; // special trapped yes
const regularYesText = yesBtn.innerHTML; // original yes text

// Start trapped timer
function startTrappedTimer() {
  trappedTimer = setTimeout(() => {
    // Transform No button into trapped Yes
    isTrapped = true;
    noBtn.innerHTML = trappedYesText;
    const yesStyle = window.getComputedStyle(yesBtn);
    noBtn.style.background = "red"; // make it stand out
    noBtn.style.color = "#fff";
    noBtn.style.border = yesStyle.border;
    noBtn.style.fontSize = yesStyle.fontSize;
    noBtn.style.fontWeight = yesStyle.fontWeight;
  }, 500); // 1 second hover/touch
}

// Cancel trapped timer (before 1s or when moving away)
function cancelTrappedTimer() {
  clearTimeout(trappedTimer);
  trappedTimer = null;

  // If button was trapped but now moving away, revert to No
  if (isTrapped) {
    isTrapped = false;
    noBtn.innerHTML = "NO"; // original text
    noBtn.style.background = ""; // reset styles
    noBtn.style.color = "";
    noBtn.style.border = "";
    noBtn.style.fontSize = "";
    noBtn.style.fontWeight = "";
  }
}

// Hook into existing events
noBtn.addEventListener("mouseenter", startTrappedTimer);
noBtn.addEventListener("mouseleave", cancelTrappedTimer);

noBtn.addEventListener("touchstart", startTrappedTimer);
noBtn.addEventListener("touchend", cancelTrappedTimer);

// Optional: if you want clicking trapped No to act like Yes
noBtn.addEventListener("click", () => {
  if (isTrapped) {
    message.innerHTML = "WOW 😛 You got me! 💕";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  }
});
