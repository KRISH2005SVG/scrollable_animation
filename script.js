const canvas = document.getElementById("scroll-canvas");
const context = canvas.getContext("2d");

const frameCount = 216;

/* Resize canvas */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* Image path */
const currentFrame = (index) =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

/* Preload images */
const images = [];
let img = new Image();
img.src = currentFrame(1);

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

/* Draw image to canvas */
function drawImage(img) {
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    img,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

/* Scroll animation */
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    drawImage(images[frameIndex]);
  });
});

/* Initial frame */
images[0].onload = () => {
  drawImage(images[0]);
};
