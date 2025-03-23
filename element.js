document.addEventListener("DOMContentLoaded", () => {
    const icon1 = document.getElementById("icon1");
    const popupBox = document.getElementById("popup-box");
    const colorOptions = document.querySelectorAll(".color-option");
    const elementText = document.getElementById("element-text");
    const elementDuration = document.getElementById("element-duration");
    const shootButton = document.getElementById("shoot-button");

    let selectedColor = "#FFFFFF"; // Default color (white)

    // Toggle Popup on Icon Click
    icon1.addEventListener("click", () => {
        if (popupBox.classList.contains("show")) {
            popupBox.classList.remove("show"); // Hide if already open
        } else {
            popupBox.classList.add("show"); // Show if not open
        }
    });

// Select Color
colorOptions.forEach(option => {
    option.addEventListener("click", () => {
        // Remove 'selected' class from all options
        colorOptions.forEach(opt => opt.classList.remove("selected"));

        // Add 'selected' class to the clicked one
        option.classList.add("selected");

        // ✅ Fix: Get the actual background color, not data-color
        selectedColor = window.getComputedStyle(option).backgroundColor;

        console.log("Selected Color:", selectedColor); // Debugging
    });
});


    // Handle Shoot Button Click
    shootButton.addEventListener("click", () => {
        const textValue = elementText.value.trim();
        const durationValue = elementDuration.value;

        if (textValue === "") {
            alert("Please enter your thoughts!");
            return;
        }

        console.log("User Input:", { text: textValue, color: selectedColor, duration: durationValue });

        popupBox.classList.remove("show"); // Hide popup

        createFloatingElement(textValue, selectedColor, durationValue);
    });

// Function to Create Floating Elements in Space
function createFloatingElement(text, color, duration) {
    const element = document.createElement("div");
    element.classList.add("floating-element");
    element.innerText = text;
    element.style.backgroundColor = color || selectedColor;  
    console.log("Element Created with Color:", color || selectedColor); // Debugging

    let worldX, worldY;
    let validPosition = false;
    let maxAttempts = 50; // Avoid infinite loops
    let attempt = 0;
    let minDistance = 100; // Minimum distance from other elements
    let maxDistance = 200; // Maximum distance to keep them close

    while (!validPosition && attempt < maxAttempts) {
        if (elements.length > 0) {
            // Get a random existing element
            let baseElement = elements[Math.floor(Math.random() * elements.length)];
            let baseX = parseFloat(baseElement.dataset.bgX);
            let baseY = parseFloat(baseElement.dataset.bgY);

            // Generate a new position within a reasonable range
            worldX = baseX + (Math.random() * (maxDistance - minDistance) + minDistance) * (Math.random() < 0.5 ? -1 : 1);
            worldY = baseY + (Math.random() * (maxDistance - minDistance) + minDistance) * (Math.random() < 0.5 ? -1 : 1);
        } else {
            // First element, place randomly
            worldX = Math.random() * window.innerWidth - posX;
            worldY = Math.random() * window.innerHeight - posY;
        }

        // Check for collisions with existing elements
        validPosition = true;
        for (let el of elements) {
            let existingX = parseFloat(el.dataset.bgX);
            let existingY = parseFloat(el.dataset.bgY);
            let distance = Math.hypot(existingX - worldX, existingY - worldY);

            if (distance < minDistance) {
                validPosition = false;
                break; // Try again
            }
        }

        attempt++;
    }

    // Store fixed position
    element.dataset.bgX = worldX;
    element.dataset.bgY = worldY;

    // Position element relative to background movement
    element.style.left = `${worldX + posX}px`;
    element.style.top = `${worldY + posY}px`;

    document.body.appendChild(element);
    elements.push(element);

    // Click to show position (Debugging)
    element.addEventListener("click", () => {
        console.log(`Element Position: (${element.dataset.bgX}, ${element.dataset.bgY})`);
    });

    // Bubble animation effect
    setTimeout(() => {
        element.style.transform = `scale(1)`;
    }, 50);

    // Expiry time logic
    let expirationTime;
    if (duration === "24h") expirationTime = 24 * 60 * 60 * 1000;
    if (duration === "7d") expirationTime = 7 * 24 * 60 * 60 * 1000;
    if (duration === "1m") expirationTime = 30 * 24 * 60 * 60 * 1000;

    setTimeout(() => {
        element.remove();
        elements.splice(elements.indexOf(element), 1);
    }, expirationTime);
}


});

