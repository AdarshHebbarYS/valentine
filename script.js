const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

function moveNoButton() {
  const container = document.querySelector(".buttons");
  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile touch
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  message.innerHTML = "YAYYYY!! 💕🥰 I knew you’d say yes!";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
});
