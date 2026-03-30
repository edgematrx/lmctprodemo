export default async function handler(req, res) {
  // Allow cross-origin from your own Vercel domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) { res.status(500).json({ error: 'AI not configured' }); return; }

  try {
    const { messages, max_tokens, system } = req.body;

    const payload = {
      model: 'llama-3.3-70b-versatile',
      max_tokens: max_tokens || 400,
      messages: system
        ? [{ role: 'system', content: system }, ...messages]
        : messages
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
