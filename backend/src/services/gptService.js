// Wrapper supporting both OpenAI-compatible servers (/v1) and Ollama native API (http://localhost:11434)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const CONFIG = {
  baseUrl: process.env.OSS_BASE_URL || 'http://localhost:11434',
  model: process.env.OSS_MODEL || process.env.OSS_DEEP_MODEL || process.env.OSS_FAST_MODEL || 'gpt-oss-20b',
  apiKey: process.env.OSS_API_KEY || undefined,
};

function isOpenAICompatible(baseUrl) {
  return baseUrl.endsWith('/v1') || baseUrl.includes('/v1/');
}

async function chatOpenAI({ model, messages, temperature, maxTokens }) {
  const url = `${CONFIG.baseUrl}/chat/completions`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(CONFIG.apiKey ? { Authorization: `Bearer ${CONFIG.apiKey}` } : {}),
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI request failed (${url}): ${res.status} ${text}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

async function chatOllama({ model, messages, temperature, maxTokens }) {
  // Ollama native chat endpoint: POST /api/chat
  // https://github.com/ollama/ollama/blob/main/docs/api.md#chat
  const url = `${CONFIG.baseUrl.replace(/\/$/, '')}/api/chat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      options: {
        temperature,
        num_predict: maxTokens,
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI request failed (${url}): ${res.status} ${text}`);
  }
  const data = await res.json();
  // data.message.content contains the assistant reply
  const content = data?.message?.content || '';
  return content;
}

async function chat({ messages }) {
  const model = CONFIG.model;
  const temperature = 0.7;
  const maxTokens = 512;
  try {
    if (isOpenAICompatible(CONFIG.baseUrl)) {
      return await chatOpenAI({ model, messages, temperature, maxTokens });
    }
    return await chatOllama({ model, messages, temperature, maxTokens });
  } catch (err) {
    const hint = `Hint: If you're using Ollama, set OSS_BASE_URL=http://localhost:11434 (no /v1). If you're using an OpenAI-compatible server (vLLM/LM Studio), set OSS_BASE_URL to end with /v1.`;
    throw new Error(`${err.message}\n${hint}`);
  }
}

module.exports = { chat };

