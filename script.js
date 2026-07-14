const compliments = [
  "You make bugs disappear like magic",
  "You're the CSS to my HTML",
  "Your code runs smoother than butter",
  "You're not just smart — you're *console.log('amazing')*",
  "You have great taste in colors",
  "You're basically an AI with emotions",
  "Your logic is sharper than C++ syntax",
  "You're the semicolon that completes my statement",
  "You make debugging look like art",
  "You're destined to build something big",
  "You radiate positivity like sunshine on a rainy day!",
  "You spread joy faster than Wi-Fi!",
  "Your smile is more contagious than laughter!",
  "You're 100% made of stardust and serotonin.",
  "Your smile could power a whole city!",
  "You glow differently when you're happy—keep shining!",
  "You're like a walking playlist of good vibes!"
];

const complimentEl = document.getElementById("compliment");
const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
  complimentEl.textContent = "Thinking of something nice...";
  
  try {
    const response = await fetch("/api/compliment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: "funny", recipient: "friend", tone: "sweet" }),
    });
    const data = await response.json();
    complimentEl.textContent = data.compliment;
    complimentEl.classList.add("show");
    setTimeout(() => complimentEl.classList.remove("show"), 400);
  } catch (err) {
    // fallback to your local list if the API fails
    complimentEl.textContent = compliments[Math.floor(Math.random() * compliments.length)];
  }
});