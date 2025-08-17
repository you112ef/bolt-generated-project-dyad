export const onRequest: PagesFunction = async (ctx) => {
  try {
    const { request, env } = ctx
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    const body = await request.json()
    const messages = Array.isArray(body?.messages) ? body.messages : []
    const provider = (body?.provider || 'openai').toLowerCase()
    const model = body?.model || 'gpt-4o-mini'
    const temperature = typeof body?.temperature === 'number' ? body.temperature : 0.7

    if (!messages.length) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    if (provider !== 'openai') {
      return new Response(JSON.stringify({ error: 'Only openai provider implemented in demo' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    const apiKey = env.OPENAI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY missing' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Create a streaming response that proxies OpenAI streaming chunks
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model,
              messages,
              temperature,
              stream: true
            })
          })

          if (!res.ok || !res.body) {
            const text = await res.text()
            controller.enqueue(new TextEncoder().encode(`ERROR:${text}`))
            controller.close()
            return
          }

          const reader = res.body.getReader()
          const decoder = new TextDecoder()
          while (true) {
            const { value, done } = await reader.read()
            if (done) break
            if (value) {
              const chunk = decoder.decode(value, { stream: true })
              // Forward raw SSE lines as plain text stream; frontend will parse
              controller.enqueue(new TextEncoder().encode(chunk))
            }
          }
          controller.close()
        } catch (err: any) {
          controller.enqueue(new TextEncoder().encode(`ERROR:${err?.message || 'unknown error'}`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}