export async function callOpenAIChatCompletions(payload: unknown) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { ok: false as const, status: 500, message: "OPENAI_API_KEY is not configured." };
  }

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    return {
      ok: false as const,
      status: resp.status,
      message: (data as any)?.error?.message || (data as any)?.message || "OpenAI request failed."
    };
  }

  return { ok: true as const, data };
}
