"use server";

import OpenAI from "openai";
import { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
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
export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
      return new Response('Unauthorized', { status: 401 })
  }
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
            "You are an expert prompt engineer for cinematic image generation. Based on the user input, return a concise, highly descriptive prompt suitable for an image generation model. Focus on subject, style, lighting, and camera type. The output must be a single sentence under 480 characters, realistic and visually specific.",
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
  
}
