let posX = 0, posY = 0;  
let isDragging = false;  
let startX, startY;

document.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    posX -= dx;
    posY -= dy;

    document.body.style.backgroundPosition = `${posX}px ${posY}px`;

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.cursor = "grab";
});

// Mobile touch support
document.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    let dx = e.touches[0].clientX - startX;
    let dy = e.touches[0].clientY - startY;

    posX -= dx;
    posY -= dy;

    document.body.style.backgroundPosition = `${posX}px ${posY}px`;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", () => {
    isDragging = false;
});


// Click Animation Effect
document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", () => {
        icon.style.transform = "scale(1.3)";
        setTimeout(() => {
            icon.style.transform = "scale(1)";
        }, 200);
    });
});