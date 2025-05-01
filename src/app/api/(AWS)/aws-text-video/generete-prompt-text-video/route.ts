"use server";

import OpenAI from "openai";

// Inicialización del cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// Tipado del cuerpo de la solicitud
interface RequestBody {
  prompt: string;
  settings: {
    model: string;
    aspectRatio: string;
    styles: string;
    lighting: string;
    camera: string;
  };
}

// Handler para POST
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
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
    typeof settings.model === "string" &&
    typeof settings.aspectRatio === "string" &&
    typeof settings.styles === "string" &&
    typeof settings.lighting === "string" &&
    typeof settings.camera === "string";

  if (!isSettingsValid) {
    return Response.json(
      { error: '"Settings" object is invalid or incomplete' },
      { status: 400 }
    );
  }

  // ✅ Solo los campos requeridos para el prompt enriquecido
  const composedPrompt = `
Prompt: ${prompt}
Styles: ${settings.styles}
Lighting: ${settings.lighting}
Camera: ${settings.camera}
  `.trim();

  // Solicitud al modelo de OpenAI
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
  const trimmedText = resultText.slice(0, 512);

  // Respuesta al cliente
  return new Response(JSON.stringify({ result: trimmedText }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
