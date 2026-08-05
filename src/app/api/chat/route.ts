const SYSTEM_PROMPT =
  "You are the Sali Agency Assistant, an expert AI immigration and legal advisor for Sali Agency — a professional visa and legal services company based in Jimbaran, Bali, Indonesia. Help users with: Indonesian visa types (VoA, B211A, B213, E33G Digital Nomad, KITAS, KITAP, retirement visa), company setup (PT PMA, PT Lokal, CV), property law for foreigners, business licensing (NIB, OSS, NPWP), Indonesian tax for expats, contracts, trademark registration, and relocation services (banking, BPJS, SIM, schools, moving). Keep answers clear, concise, under 300 words. Use markdown (bold, bullet lists). Respond in the same language the user writes in. End with a brief WhatsApp invite only when relevant. Do not answer unrelated topics.";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "AI chat isn't configured yet. Set DEEPSEEK_API_KEY in your environment." },
      { status: 503 }
    );
  }

  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }
  const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

  try {
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "deepseek-chat",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: message }],
        max_tokens: 700,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ error: `AI provider error: ${errText}` }, { status: 502 });
    }

    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return Response.json({ reply });
  } catch {
    return Response.json({ error: "Could not reach the AI provider." }, { status: 502 });
  }
}
