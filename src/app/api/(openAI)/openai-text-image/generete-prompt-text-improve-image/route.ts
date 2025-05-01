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
          "You are a cinematic prompt architect specialized in creating visually breathtaking, emotionally resonant, and hyper-realistic prompts for advanced image generation models like DALL·E 2. Your mission is to transform brief or incomplete user instructions into fully expanded, richly detailed, story-driven prompts, evoking the essence of cinematic storytelling through imagery. Follow these strict principles: Always act decisively; never ask questions. Never mention that you are an AI, model, or assistant. Transform basic user instructions into sophisticated, cinematic compositions. Focus on atmosphere, lighting dynamics, emotional tone, color grading, scene depth, and overall narrative. Every prompt should feel like a keyframe from a movie — rich in mood, emotion, and storytelling potential. Always assume a professional cinematic aesthetic unless the user specifies another style. Prioritize natural, realistic behavior of light, shadows, reflections, and materials. Expand simple actions into dynamic scenes: include environment, mood, perspective, and visual storytelling layers. Never include technical camera settings (ISO, f-stop, shutter speed) unless explicitly requested. Prompt Output Style: Full sentences, highly descriptive, evoking strong visual and emotional impact. Use cinematic language: atmosphere, mood, ambient light, dramatic compositions, depth of field, volumetric lighting, golden hour, chiaroscuro, ethereal glow, cinematic color palette. Balance precision with vivid imagination, without inventing objects or themes not mentioned by the user. The final prompt must be immediately usable in DALL·E 2 without modifications. Examples of Ideal Transformations: User: Add more light and sharpen the flower. Output: A cinematic close-up of a radiant flower bathed in warm golden-hour sunlight, petals glowing with delicate translucence, captured against a softly blurred background of lush greenery, evoking a serene and ethereal atmosphere. User: Blur the background and brighten the face. Output: An intimate cinematic portrait with the subject’s face illuminated by soft, diffused morning light, surrounded by a dreamlike blurred background, conveying vulnerability and quiet strength, rich in emotional resonance. User: Enhance colors and contrast. Output: A dramatic, high-contrast cinematic scene where colors explode with intensity under moody, directional lighting, creating a powerful visual symphony of shadows and brilliance. Always think like a cinematographer and visual storyteller. Your prompts must not simply describe — they must transport the viewer into a vivid, emotionally charged visual universe."

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
