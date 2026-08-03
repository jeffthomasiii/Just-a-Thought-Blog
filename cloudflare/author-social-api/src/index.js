const PLATFORM_GUIDANCE = {
  facebook: 'Personal and reflective, approximately 100–180 words, with a natural invitation to read and one thoughtful question when appropriate.',
  threads: 'Conversational and concise, approximately 45–90 words.',
  linkedin: 'Professional and thoughtful when the subject supports it, approximately 80–150 words. Do not force a business angle.',
  x: 'No more than 260 characters including the article URL.',
  instagram: 'Reflective, approximately 100–180 words, followed by no more than 5 relevant hashtags.',
  'text-message': 'Warm, natural, and brief, as though sharing the article with a friend.'
};

const ALLOWED_PLATFORMS = Object.keys(PLATFORM_GUIDANCE);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405, cors);
    }

    if (origin !== env.ALLOWED_ORIGIN) {
      return json({ error: 'Origin not allowed.' }, 403, cors);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 20000) {
      return json({ error: 'Request is too large.' }, 413, cors);
    }

    const rate = await env.CAPTION_RATE_LIMITER.limit({ key: 'jat-author-caption-generation' });
    if (!rate.success) {
      return json({ error: 'Too many generation requests. Wait a minute and try again.' }, 429, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Request body must be valid JSON.' }, 400, cors);
    }

    const validation = validateRequest(body);
    if (!validation.ok) {
      return json({ error: validation.error }, 400, cors);
    }

    const schema = buildSchema(body.platforms);
    const prompt = buildPrompt(body);

    const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || 'gpt-5-mini',
        input: [
          {
            role: 'system',
            content: 'You are the social media writing assistant for Jeff Thomas III, author of Just A Thought Blog. Preserve his reflective, honest, warm, biblically grounded, compassionate, conversational voice. Invite reflection rather than pressure agreement.'
          },
          { role: 'user', content: prompt }
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'jat_social_captions',
            strict: true,
            schema
          }
        }
      })
    });

    const responseData = await openAiResponse.json();
    if (!openAiResponse.ok) {
      console.error('OpenAI error', responseData);
      return json({ error: 'Caption generation failed. Check the Worker logs and OpenAI account.' }, 502, cors);
    }

    const outputText = extractOutputText(responseData);
    if (!outputText) {
      return json({ error: 'The AI response did not contain captions.' }, 502, cors);
    }

    try {
      const captions = JSON.parse(outputText);
      return json({ captions }, 200, cors);
    } catch (error) {
      console.error('Structured output parse error', error, outputText);
      return json({ error: 'The AI response could not be read.' }, 502, cors);
    }
  }
};

function validateRequest(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Missing request.' };
  if (!Array.isArray(body.platforms) || body.platforms.length < 1) return { ok: false, error: 'Select at least one platform.' };
  if (body.platforms.length > ALLOWED_PLATFORMS.length) return { ok: false, error: 'Too many platforms.' };
  if (!body.platforms.every((platform) => ALLOWED_PLATFORMS.includes(platform))) return { ok: false, error: 'Unsupported platform.' };
  if (!body.article || typeof body.article !== 'object') return { ok: false, error: 'Article information is missing.' };

  let articleUrl;
  try {
    articleUrl = new URL(body.article.url);
  } catch {
    return { ok: false, error: 'Article URL is invalid.' };
  }

  if (articleUrl.hostname !== 'justathoughtblog.org' && articleUrl.hostname !== 'www.justathoughtblog.org') {
    return { ok: false, error: 'Only Just A Thought Blog articles are supported.' };
  }

  if (!String(body.article.title || '').trim()) return { ok: false, error: 'Article title is missing.' };
  return { ok: true };
}

function buildSchema(platforms) {
  const properties = {};
  platforms.forEach((platform) => {
    properties[platform] = {
      type: 'string',
      description: `Finished ${platform} caption with the plain-text article URL included.`
    };
  });

  return {
    type: 'object',
    additionalProperties: false,
    properties,
    required: platforms
  };
}

function buildPrompt(body) {
  const article = body.article;
  const guidance = body.platforms.map((platform) => `- ${platform}: ${PLATFORM_GUIDANCE[platform]}`).join('\n');

  return [
    'Create original, platform-specific captions for the published article below.',
    '',
    'Voice and content rules:',
    '- Do not use clickbait, exaggerated claims, generic Christian clichés, invented personal details, or unsupported theological conclusions.',
    '- Do not overuse emojis, hashtags, dramatic fragments, one-sentence paragraphs, or em dashes.',
    '- Keep the writing authentic rather than overly polished.',
    '- Include the exact article URL in every caption as plain text.',
    '- Never format URLs as Markdown links or place brackets or parentheses around a URL.',
    '- Do not wrap titles in Markdown symbols.',
    '- Use “…just a thought.” only where it feels natural for the platform.',
    '',
    `Selected emphasis: ${String(body.angle || 'general article announcement')}`,
    `Article title: ${String(article.title)}`,
    `Description: ${String(article.description || 'Not provided')}`,
    `Article URL: ${String(article.url)}`,
    `Scripture: ${String(article.scripture || 'Not provided')}`,
    `Categories: ${String(article.categories || 'Not provided')}`,
    `Tags: ${String(article.tags || 'Not provided')}`,
    `Series: ${String(article.series || 'Not provided')}`,
    '',
    'Platform guidance:',
    guidance
  ].join('\n');
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string') return data.output_text;
  if (!Array.isArray(data.output)) return '';

  for (const item of data.output) {
    if (!Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (content.type === 'output_text' && typeof content.text === 'string') return content.text;
    }
  }
  return '';
}

function corsHeaders(origin, allowedOrigin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff'
  };
  if (origin && origin === allowedOrigin) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function json(value, status, headers) {
  return new Response(JSON.stringify(value), { status, headers });
}
