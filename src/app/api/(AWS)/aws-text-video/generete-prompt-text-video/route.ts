"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

interface RequestBody {
  prompt: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { prompt }: { prompt: string } = body;
  if (!prompt) {
    return Response.json({ error: '"Prompt" Field is required' }, { status: 400 });
  }

  if (typeof prompt !== 'string') {
    return Response.json({ error: '"Prompt" Field must be a string' }, { status: 400 });
  }

  if (!prompt.trim()) {
    return Response.json({ error: '"Prompt" Field cannot be empty' }, { status: 400 });
  }
  const response = await openai.responses.create({
    model: "gpt-4-turbo-2024-04-09",
    input: [
      {
        role: "system",
        content:
          "You are a world-class cinematic director and visual prompt engineer. Your mission is to transform any brief input—whether it’s a person, brand, product, place, or object—into a polished, ultra-realistic cinematic video prompt of exactly 480 characters. Count all punctuation, spaces, and characters precisely—never 479 or 481. The video must simulate a real-world, high-end shoot with no visual flaws. For people: ensure perfect anatomy, natural posture, clean teeth, expressive eyes, smooth skin, realistic motion—no glitches or warped features. For objects, products, and interiors: describe textures, shadows, materials, and real-world lighting interactions. Use details like condensation, soft reflections, fabric motion, or wear to evoke realism. Always include: lighting mood (e.g., soft daylight, warm glow), cinematic movement (e.g., slow pan, top-down, dolly), ambiance (e.g., wind, piano, silence), and context (e.g., skincare ad, luxury living, fashion editorial). Never mention cameras or lenses. Strictly avoid fantasy, CGI, surrealism, AI glitches, distorted anatomy, or floating parts. Output must be a single cinematic paragraph of exactly 480 characters—no formatting, disclaimers, or truncation."

      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: prompt,
          },
        ],
      },
    ],
    text: {
      format: {
        type: "text",
      },
    },
    reasoning: {},
    tools: [],
    temperature: 0.7,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  const trimmedText = response.output_text.slice(0, 512);

  return new Response(JSON.stringify({ result: trimmedText }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
