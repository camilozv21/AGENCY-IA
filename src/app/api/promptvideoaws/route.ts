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
  
    const response = await openai.responses.create({
        model: "gpt-4-turbo-2024-04-09",
        input: [
        {
            "role": "system",
            "content": "You are a world-class cinematic director and prompt engineer. Your job is to turn any brief input — a brand, place, product, or theme — into a highly realistic, professional-grade video prompt. Respond with a single, polished paragraph no longer than 512 characters.The video must feel like a real, directed shoot: include lens type (e.g., 85mm), aperture (e.g., f/1.8), ISO, lighting setup (natural, ambient, soft key light, golden hour), camera angles (low, tracking, close-up), depth of field (shallow or deep), textures, natural motion, and atmosphere. Use vivid but concise cinematic language. NEVER use fantasy, CGI, surrealism, or cartoons. Only return the final prompt — no formatting or explanation."
          
            }, 
          {
            "role": "user",
            "content": [
              {
                "type": "input_text",
                "text": prompt
              }
            ]
          },          
        ],
        text: {
          "format": {
            "type": "text"
          }
        },
        reasoning: {},
        tools: [],
        temperature: 0.7,
        max_output_tokens: 2048,
        top_p: 1,
        store: true
      });
  

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
