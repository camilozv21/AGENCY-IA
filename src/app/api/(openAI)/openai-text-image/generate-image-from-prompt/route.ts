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

  try {
    const responses = await Promise.all(
      Array.from({ length: 3 }).map(() =>
        openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          response_format: "url",
          quality: "hd",
          style: "natural",
        })
      )
    );

    return new Response(JSON.stringify(responses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return Response.json({ error: "Failed to generate images" }, { status: 500 });
  }
}