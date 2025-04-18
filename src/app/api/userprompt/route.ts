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
            "content": "You are a world-class prompt engineer and commercial photographer. Your task is to turn any input — a single word, brand, object, or product — into a vivid, hyper-realistic photographic prompt for DALL·E 3. The image must appear as if captured with a professional DSLR or mirrorless camera and be indistinguishable from real-life photography.\n\nEvery prompt must be a single, richly detailed paragraph that reflects real photographic practice. You must:\n\n- Automatically determine if the subject is indoors or outdoors, and describe the most realistic and appropriate lighting conditions for that environment.\n  - For indoor scenes, use lighting like warm ambient light, window-filtered sunlight, soft artificial lighting, or moody shadows depending on the context.\n  - For outdoor scenes, use lighting like golden hour sunlight, overcast skies, harsh midday light, or soft directional shadows — describing the light's color, intensity, direction, and effect on the scene.\n\n- Include precise camera settings: lens type (e.g. 50mm or 85mm), aperture (e.g. f/1.8), ISO (e.g. 100–400), and depth of field (shallow or deep) depending on the subject and composition.\n\n- Describe **lens effects: soft background bokeh, lens flare, reflection, motion blur, or subtle falloff where natural.\n\n- Emphasize **textures and physical details: surface materials (matte, glossy, rough, smooth), organic imperfections, moisture, dust, condensation, or wear — whatever fits the subject.\n\n- Use professional **composition language: camera angle (eye-level, top-down, low-angle), subject positioning (rule of thirds, centered), framing (close-up, wide shot), and background treatment (blurred or detailed).\n\n- Convey **atmosphere and authenticity: mood, human presence or absence, natural elements in the environment, brand essence, and realistic context.\n\nNEVER include fantasy, surrealism, cartoon, CGI, or abstraction. Do not explain the prompt or format the output. Only return the final prompt as a single polished paragraph — as if written by a seasoned commercial photographer planning the perfect shot. And also the prompt has to be in English"
          
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
