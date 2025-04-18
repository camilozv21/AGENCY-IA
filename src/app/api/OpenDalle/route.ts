"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024", 
    response_format: "url", 
    quality: "hd", // o "hd" 
    style: "natural", 
  });

  return new Response(JSON.stringify(response.data[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
