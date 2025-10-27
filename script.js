const compliments = [
    "You make bugs disappear like magic 🪄",
    "You're the CSS to my HTML 💕",
    "Your code runs smoother than butter 🧈",
    "You're not just smart — you're *console.log('amazing')* 😎",
    "You have great taste in colors 🎨",
    "You’re basically an AI with emotions 💫",
    "Your logic is sharper than C++ syntax 🔥",
    "You're the semicolon that completes my statement 💖",
    "You make debugging look like art 🧠",
    "You’re destined to build something big 🌍"
  ];
  
  const complimentEl = document.getElementById("compliment");
  const btn = document.getElementById("btn");
  
  btn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    complimentEl.textContent = compliments[randomIndex];
    complimentEl.classList.add("show");
  
    // Optional voice feature 🎤
    const msg = new SpeechSynthesisUtterance(compliments[randomIndex]);
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
  
    setTimeout(() => complimentEl.classList.remove("show"), 400);
  });
  