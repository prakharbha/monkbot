export async function callOpenAIChatCompletions(payload: unknown) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { ok: false as const, status: 500, message: "AI service is not configured." };
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
    // H3-R3: Log real error server-side but never expose OpenAI internals to the client
    // (quota details, model names, billing info could be in the error message)
    console.error("OpenAI API error:", (data as any)?.error?.message ?? resp.status);
    return {
      ok: false as const,
      status: resp.status >= 500 ? 502 : resp.status,
      message: "AI service is temporarily unavailable. Please try again."
    };
  }

  return { ok: true as const, data };
}

