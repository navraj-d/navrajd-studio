console.log("script.js is connected!");

/* Mouse light trail */
document.addEventListener("mousemove", function (e) {
  const trail = document.createElement("div");
  trail.style.position = "fixed";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  trail.style.width = "18px";
  trail.style.height = "18px";
  trail.style.borderRadius = "50%";
  trail.style.pointerEvents = "none";
  trail.style.zIndex = "0";

  const hue = (Date.now() / 3) % 360;
  trail.style.background = `hsl(${hue}, 100%, 60%)`;
  trail.style.boxShadow = `
    0 0 10px hsl(${hue}, 100%, 60%),
    0 0 20px hsl(${hue}, 100%, 60%),
    0 0 35px hsl(${hue}, 100%, 60%)
  `;
  trail.style.transform = "translate(-50%, -50%)";
  trail.style.transition = "opacity 0.7s ease, transform 0.7s ease";

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.style.opacity = "0";
    trail.style.transform = "translate(-50%, -50%) scale(0)";
  }, 20);

  setTimeout(() => trail.remove(), 700);
});

/* Dark mode */
const toggle = document.getElementById("dark-mode-toggle");
const darkBackgroundButton = document.getElementById("dark-background-toggle");

function updateDarkBackgroundButton() {
  if (!darkBackgroundButton) return;

  darkBackgroundButton.textContent = document.body.classList.contains("dark-blue-background")
    ? "⚫ Black Background"
    : "🌌 Dark Blue Background";
}

if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark-mode");

  if (toggle) {
    toggle.checked = true;
  }
}

if (localStorage.getItem("darkBlueBackground") === "on") {
  document.body.classList.add("dark-blue-background");
}

updateDarkBackgroundButton();

if (toggle) {
  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", this.checked);
    localStorage.setItem("darkMode", this.checked ? "on" : "off");
    updateDarkBackgroundButton();
  });
}

/* Dark background toggle */
if (darkBackgroundButton) {
  darkBackgroundButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-blue-background");

    const isDarkBlue = document.body.classList.contains("dark-blue-background");

    localStorage.setItem("darkBlueBackground", isDarkBlue ? "on" : "off");
    updateDarkBackgroundButton();
  });
}

/* Background toggle */
const backgroundButton = document.getElementById("background-toggle");
const lightGradientButton = document.getElementById("light-gradient-toggle");

function updateLightBackgroundButtons() {
  if (backgroundButton) {
    backgroundButton.textContent = document.body.classList.contains("blue-background")
      ? "🟢 Green/Purple Background"
      : "🌊 Blue Background";
  }

  if (lightGradientButton) {
    lightGradientButton.textContent = document.body.classList.contains("blue-red-background")
      ? "🌈 Green/Purple Background"
      : "🔵🔴 Blue/Red Gradient";
  }
}

if (backgroundButton) {
  if (localStorage.getItem("blueBackground") === "on") {
    document.body.classList.add("blue-background");
  }

  if (localStorage.getItem("blueRedBackground") === "on") {
    document.body.classList.add("blue-red-background");
    document.body.classList.remove("blue-background");
  }

  updateLightBackgroundButtons();

  backgroundButton.addEventListener("click", function () {
    document.body.classList.remove("blue-red-background");
    localStorage.setItem("blueRedBackground", "off");

    document.body.classList.toggle("blue-background");
    const isBlue = document.body.classList.contains("blue-background");

    localStorage.setItem("blueBackground", isBlue ? "on" : "off");
    updateLightBackgroundButtons();
  });
}

/* Blue / red gradient background */
if (lightGradientButton) {
  updateLightBackgroundButtons();

  lightGradientButton.addEventListener("click", function () {
    const isAlreadyGradient = document.body.classList.contains("blue-red-background");

    if (isAlreadyGradient) {
      document.body.classList.remove("blue-red-background");
      localStorage.setItem("blueRedBackground", "off");
    } else {
      document.body.classList.add("blue-red-background");
      document.body.classList.remove("blue-background");

      localStorage.setItem("blueRedBackground", "on");
      localStorage.setItem("blueBackground", "off");
    }

    updateLightBackgroundButtons();
  });
}

/* Click light rays */
document.addEventListener("click", function (e) {
  if (!document.body.classList.contains("dark-mode")) return;

  const container = document.createElement("div");
  container.className = "ray-container";
  container.style.left = e.clientX + "px";
  container.style.top = e.clientY + "px";
  document.body.appendChild(container);

  const ripple = document.createElement("div");
  ripple.className = "click-ripple";
  container.appendChild(ripple);

  const glow = document.createElement("div");
  glow.className = "click-glow";
  container.appendChild(glow);

  const colors = ["#00ff55", "#00ffff", "#ffff00", "#ff00aa", "#9900ff", "#ffffff"];

  for (let i = 0; i < 28; i++) {
    const ray = document.createElement("div");
    ray.className = "flow-ray";

    const angle = (360 / 28) * i + (Math.random() * 12 - 6);
    const length = 180 + Math.random() * 280;
    const width = 2 + Math.random() * 5;
    const delay = Math.random() * 0.25;
    const color = colors[Math.floor(Math.random() * colors.length)];

    ray.style.setProperty("--angle", angle + "deg");
    ray.style.setProperty("--length", length + "px");
    ray.style.setProperty("--width", width + "px");
    ray.style.setProperty("--delay", delay + "s");
    ray.style.background = `linear-gradient(90deg, transparent, ${color}, #ffffff, ${color}, transparent)`;

    container.appendChild(ray);
  }

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.className = "ray-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 350;

    particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
    particle.style.setProperty("--y", Math.sin(angle) * distance + "px");
    particle.style.animationDelay = Math.random() * 0.2 + "s";

    container.appendChild(particle);
  }

  setTimeout(() => container.remove(), 2300);
});

/* =========================================
   SECRET CR7 -> TETRIS TAB
   ========================================= */

const secretCode = "cr7";
let secretInput = "";

function addTetrisTab() {
  const nav = document.querySelector("nav");

  if (!nav || nav.querySelector(".secret-tetris-tab")) {
    return;
  }

  const tetrisTab = document.createElement("a");
  tetrisTab.className = "secret-tetris-tab";
  tetrisTab.href = "tetris.html";
  tetrisTab.textContent = "Tetris";
  tetrisTab.setAttribute("aria-label", "Open Tetris");

  nav.appendChild(tetrisTab);
}

/* Add the secret tab when it is currently unlocked. */
if (localStorage.getItem("tetrisUnlocked") === "on") {
  addTetrisTab();
}

function removeTetrisTab() {
  const tab = document.querySelector(".secret-tetris-tab");

  if (tab) {
    tab.remove();
  }
}

document.addEventListener("keydown", function (e) {
  /* Ignore typing inside form fields if any are added later. */
  const tag = e.target.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") {
    return;
  }

  secretInput += e.key.toLowerCase();

  if (secretInput.length > secretCode.length) {
    secretInput = secretInput.slice(-secretCode.length);
  }

  if (secretInput === secretCode) {
    const isUnlocked = localStorage.getItem("tetrisUnlocked") === "on";

    if (isUnlocked) {
      localStorage.setItem("tetrisUnlocked", "off");
      removeTetrisTab();
    } else {
      localStorage.setItem("tetrisUnlocked", "on");
      addTetrisTab();
    }

    secretInput = "";
  }
});
