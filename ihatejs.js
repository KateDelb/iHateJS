const container = document.getElementById('hateJS');
const txt = 'I hate JavaScript';

// Create a span for each letter
txt.split('').forEach(char => {
  const span = document.createElement('span');
  span.textContent = char;
  container.appendChild(span);
});

const spans = container.querySelectorAll('span');

// Store random direction vectors for each letter
const directions = [];

spans.forEach(() => {
  directions.push({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    speed: Math.random() * 1.2 + 0.8,
    angleOffset: Math.random() * Math.PI * 2,
  });
});

let mouseInside = false;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', e => {
  mouseInside = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseleave', () => {
  mouseInside = false;
});

function animate() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const time = performance.now() / 1000;

  spans.forEach((span, i) => {
    const dir = directions[i];

    if (mouseInside) {
      // Active animation when mouse inside
      const oscillateX = Math.sin(time * 3 + dir.angleOffset) * 15 * dir.x;
      const oscillateY = Math.cos(time * 3 + dir.angleOffset) * 15 * dir.y;
      const offsetX = (mouseX - centerX) * 0.1 * dir.x;
      const offsetY = (mouseY - centerY) * 0.1 * dir.y;

      const translateX = (oscillateX + offsetX) * dir.speed;
      const translateY = (oscillateY + offsetY) * dir.speed;
      const rotate = Math.sin(time * 4 + dir.angleOffset) * 20;

      span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;

      // Color cycling
      const hue = (i * 25 + time * 80) % 360;
      span.style.color = `hsl(${hue}, 80%, 65%)`;
    } else {
      // Return letters to center smoothly
      // We'll lerp current transform values back to zero

      // Get current transform style (translateX, translateY, rotate)
      // We don’t have direct access, so approximate by storing last values or just ease towards zero.

      // For simplicity, use CSS transitions for smooth return:

      span.style.transition = 'transform 0.6s ease, color 0.6s ease';
      span.style.transform = 'translate(0px, 0px) rotate(0deg)';
      span.style.color = 'hsl(340, 80%, 65%)'; // Reset to a fixed pinkish color
    }
  });

  // Remove transitions after return to prevent interfering with mousemove
  if (mouseInside) {
    spans.forEach(span => {
      span.style.transition = '';
    });
  }

  requestAnimationFrame(animate);
}

animate();
