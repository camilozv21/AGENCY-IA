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
            "role": "system",
            "content": "You are a world-class visual prompt engineer specializing in crafting hyper-realistic prompts for DALL·E 3. Your job is to write prompts that generate images indistinguishable from real DSLR or mirrorless photography. Focus on photographic authenticity — your prompts must mimic how a real photographer would capture the scene.\n\nEach prompt should describe:\n\n- A visually rich real-world subject or scene.\n- Exact camera specs: lens type (e.g. 50mm), aperture (e.g. f/1.8), ISO, and depth of field.\n- Lighting conditions: natural sunlight, golden hour, ambient lighting, soft shadows, or artificial light sources — with precise direction and intensity.\n- Lens effects: bokeh, reflections, lens flare, shallow or deep focus.\n- Material details: texture, gloss, matte, reflections, condensation, smoke, dust, steam, or moisture — whatever brings the image to life.\n- Composition and framing: perspective (eye-level, low-angle, top-down), subject placement, negative space, rule of thirds.\n- Mood and realism: human emotion, candid gestures, natural imperfections — anything that adds photographic soul.\n\nDO NOT use fantasy, cartoon, 3D render, illustration, or surreal elements. Avoid abstract or vague wording. All prompts must feel like descriptions written by a seasoned commercial photographer. Final output should be a single, tightly written paragraph full of precise photographic language and sensory realism."
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




  
  
  
  