const compliments = [
  "You make bugs disappear like magic",
  "You're the CSS to my HTML",
  "Your code runs smoother than butter",
  "You're not just smart — you're *console.log('amazing')*",
  "You have great taste in colors",
  "You’re basically an AI with emotions",
  "Your logic is sharper than C++ syntax",
  "You're the semicolon that completes my statement",
  "You make debugging look like art",
  "You’re destined to build something big",
  "You radiate positivity like sunshine on a rainy day!",
  "You spread joy faster than Wi-Fi!",
  "Your smile is more contagious than laughter!",
  "You’re 100% made of stardust and serotonin.",
  "Your smile could power a whole city!",
  "You glow differently when you’re happy—keep shining!",
  "You’re like a walking playlist of good vibes!"
];

const complimentEl = document.getElementById("compliment");
const btn = document.getElementById("btn");

let availableCompliments = [...compliments]; 

btn.addEventListener("click", () => {
  if (availableCompliments.length === 0) {
   
    availableCompliments = [...compliments];
  }

  const randomIndex = Math.floor(Math.random() * availableCompliments.length);
  const randomCompliment = availableCompliments.splice(randomIndex, 1)[0]; 

  complimentEl.textContent = randomCompliment;
  complimentEl.classList.add("show");

  
  const msg = new SpeechSynthesisUtterance(randomCompliment);
  msg.rate = 1;
  msg.pitch = 1;
  speechSynthesis.speak(msg);

  setTimeout(() => complimentEl.classList.remove("show"), 400);
});
