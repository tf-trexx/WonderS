let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;
let velocityX = 0, velocityY = 0;
let friction = 0.95;
const elements = []; // Stores all created elements

document.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    velocityX = 0;
    velocityY = 0;
    document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    posX += dx;
    posY += dy;

    velocityX = dx;
    velocityY = dy;

    // Move background
    document.body.style.backgroundPosition = `${posX}px ${posY}px`;

    // Move elements to keep them fixed in space
    updateElementPositions();

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.cursor = "grab";
    applyInertia();
});

// Smooth Inertia Effect
function applyInertia() {
    if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
        posX += velocityX;
        posY += velocityY;

        document.body.style.backgroundPosition = `${posX}px ${posY}px`;

        updateElementPositions(); // Ensure elements move with background

        velocityX *= friction;
        velocityY *= friction;

        requestAnimationFrame(applyInertia);
    }
}

// Moves all elements when the background moves
function updateElementPositions() {
    elements.forEach(el => {
        let originalX = parseFloat(el.dataset.bgX);
        let originalY = parseFloat(el.dataset.bgY);

        el.style.left = `${originalX + posX}px`;
        el.style.top = `${originalY + posY}px`;
    });
}

// Mobile Touch Support
document.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    velocityX = 0;
    velocityY = 0;
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    let dx = e.touches[0].clientX - startX;
    let dy = e.touches[0].clientY - startY;

    posX += dx;
    posY += dy;

    velocityX = dx;
    velocityY = dy;

    document.body.style.backgroundPosition = `${posX}px ${posY}px`;

    updateElementPositions(); // Ensure elements move with background

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", () => {
    isDragging = false;
    applyInertia();
});

// Click Animation Effect (for icons)
document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", () => {
        icon.style.transform = "scale(1.3)";
        setTimeout(() => {
            icon.style.transform = "scale(1)";
        }, 200);
    });
});

// Prevent Pinch Zoom (Stops unwanted zooming on mobile)
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) e.preventDefault();
}, { passive: false });
