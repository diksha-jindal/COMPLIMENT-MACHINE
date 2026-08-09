// ==========================
// Compliments
// ==========================
const compliments = [
  "You make bugs disappear like magic ✨",
  "You're the CSS to my HTML ❤️",
  "Your code runs smoother than butter 🧈",
  "You're smarter than Stack Overflow 😎",
  "Your smile is your superpower 😊",
  "You radiate positivity wherever you go 🌸",
  "You're basically an AI with emotions 🤖",
  "Your logic is sharper than C++ syntax 💻",
  "You're the semicolon that completes my statement ;)",
  "You make debugging look like art 🎨",
  "You're destined to build something amazing 🚀",
  "You spread joy faster than Wi-Fi 📶",
  "Your smile could power an entire city ☀️",
  "You're made of stardust and serotonin ✨",
  "You brighten everyone's day 💛",
  "You're a masterpiece in progress 🌈",
  "Believe in yourself—you've got this! 💪",
  "You're stronger than you think ❤️",
  "You inspire people around you 🌸",
  "You deserve all the happiness in the world 😊",
  "You have a way of making ordinary moments feel special. ✨",
"Someone is smiling today because of your kindness. 💛",
"You don't just dream—you make things happen. 🚀",
"The world is brighter because you're in it. ☀️",
"You're proof that hard work and kindness can exist together. 🌸",
"Your potential is far greater than your doubts. 💫",
"You make people feel seen, and that's a rare gift. ❤️",
"Every challenge you overcome becomes part of your strength. 💪",
"Your presence has a calming effect on people around you. 🍃",
"You're growing into someone your younger self would admire. 🌈",
"Your ideas deserve to be heard. 🌟",
"You inspire confidence without even trying. 😊",
"You have the courage to keep going, even on difficult days. 🤍",
"You make the internet a nicer place just by being here. 💻",
"Your future is quietly cheering for you. 🎯",
"You bring warmth wherever you go. 🌼",
"You have a beautiful habit of making people feel valued. 💖",
"Your consistency will take you further than talent alone. 🚀",
"You are someone's reason to believe that good people still exist. 🌷",
"You're becoming stronger with every step you take. 🌿",
"You have an energy that makes people feel comfortable. ✨",
"The effort you're putting in today will amaze future you. 🌟",
"You deserve every good thing that's coming your way. 💛",
"Your smile can brighten even the dullest day. 😊",
"You're capable of creating something truly unforgettable. 🎨",
"You have a heart that's just as beautiful as your mind. ❤️",
"You remind people that kindness is never out of style. 🌸",
"You're more resilient than you realize. 💪",
"You carry hope wherever you go. ☀️",
"You're exactly the kind of person this world needs more of. 🌍",
"You make learning and growing look inspiring. 📚",
"You have a quiet confidence that's incredibly powerful. ✨",
"Keep being yourself—it's your greatest superpower. 🌈",
"Your best chapter hasn't even begun yet. 📖",
"You're doing better than you give yourself credit for. 💖",
"Even your small achievements deserve to be celebrated. 🎉",
"You have a spark that can't be replaced. ✨",
"Your determination is genuinely inspiring. 🚀",
"You make difficult things look possible. 🌟",
"Believe it or not, you're someone's inspiration today. 💛"
  ];
  
  
  // ==========================
  // DOM Elements
  // ==========================

const compliment = document.getElementById("compliment");
const button = document.getElementById("btn");
const audioBtn = document.getElementById("audioBtn");
let currentCompliment = compliment.textContent;
let availableCompliments = [...compliments];



// ==========================
// Voice Loading Helper
// ==========================

let cachedVoices = [];

function loadVoices() {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();
    if (voices.length) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      cachedVoices = speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
  });
}

// Preload voices as soon as possible
loadVoices();

function pickFemaleVoice(voices) {
  // Ordered by how natural/pleasant they tend to sound
  const preferredNames = [
    "google us english",
    "samantha",
    "microsoft zira",
    "zira",
    "microsoft aria",
    "aria",
    "victoria",
    "karen",
    "moira",
    "tessa",
    "fiona",
    "female"
  ];

  for (const name of preferredNames) {
    const match = voices.find(v => v.name.toLowerCase().includes(name));
    if (match) return match;
  }

  // Fallback: any English voice
  return voices.find(v => v.lang.startsWith("en")) || voices[0] || null;
}

// ==========================
// Emoji Removal Helper
// ==========================

function removeEmojis(text) {
  return text
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\uFE0F]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ==========================
// Audio Button
// ==========================

audioBtn.addEventListener("click", async () => {

  speechSynthesis.cancel();

  const cleanText = removeEmojis(currentCompliment);

  const speech = new SpeechSynthesisUtterance(cleanText);

  speech.rate = 1;
  speech.pitch = 1.15;
  speech.volume = 1;

  // Make sure voices are actually loaded before picking one
  let voices = cachedVoices.length ? cachedVoices : await loadVoices();

  const femaleVoice = pickFemaleVoice(voices);

  if (femaleVoice) {
    speech.voice = femaleVoice;
  }

  // Simple visual feedback while speaking
  audioBtn.disabled = true;
  audioBtn.textContent = "🔊 Speaking...";

  speech.onend = () => {
    audioBtn.disabled = false;
    audioBtn.textContent = "🔊 Listen";
  };
  speech.onerror = () => {
    audioBtn.disabled = false;
    audioBtn.textContent = "🔊 Listen";
  };

  speechSynthesis.speak(speech);

});
  
 // ==========================
// Theme Switcher
// ==========================

const themeButtons = document.querySelectorAll(".theme-btn");

const themes = [
  "pink",
  "dark",
  "light",
  "purple",
  "red",
  "brown",
  "blue",
  "green",
];

const savedTheme = localStorage.getItem("theme") || "pink";

// Apply saved theme
document.body.classList.remove(...themes);
document.body.classList.add(savedTheme);

// Highlight active button
themeButtons.forEach((btn) => {
  if (btn.dataset.theme === savedTheme) {
    btn.classList.add("active");
  }
});

// Change theme on click
themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;

    // Remove previous theme
    document.body.classList.remove(...themes);

    // Add new theme
    document.body.classList.add(theme);

    // Save theme
    localStorage.setItem("theme", theme);

    // Update active button
    themeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


// ==========================
// Navbar Mobile Toggle
// ==========================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navAuth = document.querySelector(".nav-auth");
const navDropdown = document.querySelector(".nav-dropdown");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navAuth.classList.toggle("open");
});

// On mobile, tapping "Themes" opens the dropdown instead of hover
navDropdown.querySelector(".dropdown-toggle").addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    navDropdown.classList.toggle("open");
  }
});


// ==========================
// Locked Compliment State
// ==========================

const lockedMessages = [
  "🔒 no compliments for ghosts... sign up bestie 💅",
  "🚫 nice try. login first, no cap 🔐",
  "✨ compliments are VIP only rn — sign up to unlock 💎",
  "🫥 who dis? sign up so we know who to hype up",
  "🔐 locked in. unlock the vibes — create an account"
];

function showLockedCompliment() {
  const randomLocked = lockedMessages[Math.floor(Math.random() * lockedMessages.length)];
  compliment.textContent = randomLocked;
  compliment.classList.add("locked");
  currentCompliment = randomLocked;
}

function showUnlockedDefault() {
  compliment.classList.remove("locked");
  compliment.textContent = "You are capable of amazing things 🌸";
  currentCompliment = compliment.textContent;
}

function updateComplimentLockState() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showUnlockedDefault();
  } else {
    showLockedCompliment();
  }
}



// ==========================
// Auth Modal + User Storage
// ==========================

const authOverlay = document.getElementById("authOverlay");
const authClose = document.getElementById("authClose");
const authTabs = document.querySelectorAll(".auth-tab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const navAuthContainer = document.getElementById("navAuthContainer");
const authRequiredMsg = document.getElementById("authRequiredMsg");

function openAuthModal(tab) {
  authOverlay.classList.add("open");
  switchAuthTab(tab);
}

function closeAuthModal() {
  authOverlay.classList.remove("open");
}

function switchAuthTab(tab) {
  authTabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  loginForm.style.display = tab === "login" ? "flex" : "none";
  signupForm.style.display = tab === "signup" ? "flex" : "none";
  document.getElementById("loginError").textContent = "";
  document.getElementById("signupError").textContent = "";
}

authClose.addEventListener("click", closeAuthModal);

authOverlay.addEventListener("click", (e) => {
  if (e.target === authOverlay) closeAuthModal();
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchAuthTab(tab.dataset.tab));
});

// ---- Nav mein login/signup vs logged-in state dikhana ----

function renderAuthUI() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const name = users[loggedInUser]?.name || "User";

    navAuthContainer.innerHTML = `
      <span class="nav-username">Hi, ${name.split(" ")[0]} 👋</span>
      <button class="nav-btn login-btn" id="logoutBtn">Log Out</button>
    `;
  } else {
    navAuthContainer.innerHTML = `
      <button class="nav-btn login-btn" id="loginBtn">Log In</button>
      <button class="nav-btn signup-btn" id="signupBtn">Sign Up</button>
    `;
  }
  updateComplimentLockState();
}

// Event delegation - taaki innerHTML replace hone ke baad bhi buttons kaam karein
navAuthContainer.addEventListener("click", (e) => {
  if (e.target.id === "loginBtn") openAuthModal("login");
  if (e.target.id === "signupBtn") openAuthModal("signup");
  if (e.target.id === "logoutBtn") {
    localStorage.removeItem("loggedInUser");
    renderAuthUI();
  }
});

// ---- Signup ----

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const errorEl = document.getElementById("signupError");

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    errorEl.textContent = "Yeh email pehle se registered hai. Login karein.";
    return;
  }

  users[email] = { name, password };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", email);

  signupForm.reset();
  renderAuthUI();
  closeAuthModal();
  authRequiredMsg.textContent = "";
});

// ---- Login ----

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[email] || users[email].password !== password) {
    errorEl.textContent = "Email ya password galat hai.";
    return;
  }

  localStorage.setItem("loggedInUser", email);

  loginForm.reset();
  renderAuthUI();
  closeAuthModal();
  authRequiredMsg.textContent = "";
});

renderAuthUI();
  
  
  // ==========================
  // Compliment Button
  // ==========================
  
  button.addEventListener("click", () => {

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        authRequiredMsg.textContent = "Main character energy unlocked after login! ✨";
        openAuthModal("signup");
        return;
    }

    if (availableCompliments.length === 0) {

        availableCompliments = [...compliments];

    }

    const randomIndex = Math.floor(Math.random() * availableCompliments.length);

    const randomCompliment = availableCompliments.splice(randomIndex, 1)[0];

    compliment.style.opacity = 0;

    setTimeout(() => {

        compliment.textContent = randomCompliment;

        currentCompliment = randomCompliment;

        compliment.style.opacity = 1;

    }, 200);

});