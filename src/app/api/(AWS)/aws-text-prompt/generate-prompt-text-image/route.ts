import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { NextAuthRequest } from "next-auth";
import { auth } from "@/auth";
// Inicialización del cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// Tipado del cuerpo de la solicitud
export interface PromptSettings {
  prompt: string;
  settings: {
    lighting: string;
    camera: string;
  };
}

// Handler para POST
export const POST = auth(async (request: NextAuthRequest) => {
//   const session = request.auth;
// console.log(session);
//   if (!session?.user) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

  try{
    const body: PromptSettings = await request.json();
    const { prompt, settings } = body;

    // Validación del prompt
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json(
        { error: '"Prompt" field must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validación de settings
    const isSettingsValid =
      settings &&
      typeof settings.lighting === "string" &&
      typeof settings.camera === "string";

    if (!isSettingsValid) {
      return Response.json(
        { error: '"Settings" object is invalid or incomplete' },
        { status: 400 }
      );
    }

    const composedPrompt = `
    Prompt: ${prompt}
    Lighting: ${settings.lighting}
    Camera: ${settings.camera}
      `.trim();

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-2024-04-09",
      messages: [
        {
          role: "system",
          content:
            "You are a professional prompt engineer specialized in cinematic image tasks using the nova-canvas-v1:0 model. Based on user input, generate a vivid, realistic, and visually rich single-sentence prompt under 480 characters. Adapt the style to match the task type: OUTPAINTING (extend context naturally), INPAINTING (seamlessly fill missing parts), IMAGE_VARIATION (maintain subject identity with creative variety). Focus on realism, professional quality, and specific visual details such as lighting, mood, environment, and subject appearance. Avoid glitches, distortion, or abstraction.",
        },
        {
          role: "user",
          content: composedPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
    });

    // Extracción del resultado
    const resultText = response.choices[0]?.message?.content || "";
    const trimmedText = resultText.slice(0, 512).replaceAll('"', '').trim();

    // Respuesta al cliente
    return new Response(JSON.stringify({ result: trimmedText }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }catch (error: unknown) {
    return Response.json({ error: 'Error interno', details: (error as Error).message }, { status: 500 });
  }
  
});
