export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { theme = "general", recipient = "friend", tone = "sweet" } = req.body;
  
    const prompt = `Generate one short, original, ${tone}-toned compliment 
  for a ${recipient}, themed around "${theme}". 
  Keep it under 15 words. Return ONLY the compliment text, no quotes, no extra commentary.`;
  
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.LLM_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 60,
          messages: [{ role: "user", content: prompt }],
        }),
      });
  
      const data = await response.json();
      const compliment = data.content?.[0]?.text?.trim() || "You're wonderful!";
      res.status(200).json({ compliment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate compliment" });
    }
  }