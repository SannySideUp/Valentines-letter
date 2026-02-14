// === Customize these ===
const SETTINGS = {
  herName: "Yara",     // change to your gf's name
  myName: "San",       // change to your name
  promise: "I’ll keep choosing you—patiently, proudly, and with my whole heart."
};

const envelope = document.getElementById("envelope");
const closeBtn = document.getElementById("closeBtn");
const confettiBtn = document.getElementById("confettiBtn");

document.getElementById("herName").textContent = SETTINGS.herName;
document.getElementById("myName").textContent = SETTINGS.myName;
document.getElementById("promiseText").textContent = SETTINGS.promise;

const dateText = document.getElementById("dateText");
dateText.textContent = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// open/close
function openLetter() {
  envelope.classList.add("open");
  envelope.setAttribute("aria-label", "Letter opened");
}
function closeLetter() {
  envelope.classList.remove("open");
  envelope.setAttribute("aria-label", "Open the letter");
}

envelope.addEventListener("click", (e) => {
  // If clicking buttons inside the letter, don't toggle via envelope click
  const isButton = e.target.closest("button");
  if (isButton) return;

  if (envelope.classList.contains("open")) {
    // do nothing on body click when open (feels calmer)
    return;
  }
  openLetter();
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLetter();
});

// Extra love effect
confettiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  burstHearts(26);
});

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLetter();
});

// Floating hearts background

function burstHearts(count = 18) {
  for (let i = 0; i < count; i++) {
    setTimeout(spawnHeart, i * 40);
  }
}

// steady background hearts
setInterval(spawnHeart, 650);

// little burst on open
function onOpenBurst() {
  burstHearts(18);
}
const observer = new MutationObserver(() => {
  if (envelope.classList.contains("open")) onOpenBurst();
});
observer.observe(envelope, { attributes: true, attributeFilter: ["class"] });
