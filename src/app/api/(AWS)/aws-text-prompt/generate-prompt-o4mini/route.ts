import OpenAI from "openai";
import { NextAuthRequest } from "next-auth";
import { auth } from "@/auth";
// Inicialización del cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// Tipado del cuerpo de la solicitud
export interface PromptSettings {
  prompt: string;
  image: string;
}

// Handler para POST
export const POST = auth(async (request: NextAuthRequest) => {
  //   const session = request.auth;
  // console.log(session);
  //   if (!session?.user) {
  //     return new NextResponse("Unauthorized", { status: 401 });
  //   }

  try {
    const body: PromptSettings = await request.json();
    const { prompt, image } = body;

    // Validación del prompt
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json(
        { error: '"Prompt" field must be a non-empty string' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "o4-mini-2025-04-16",
      messages: [
        {
          role: "system",
          content: `You are an assistant specialized in creating mask instructions for image inpainting and outpainting tasks.
Your task: Given an input image and a user request, return a short, clear text description of which parts of the image should be kept or removed.
IMPORTANT:
- Only describe the mask regions (what to keep and what to remove).
- Do NOT describe or suggest new content to generate.
- Do NOT include artistic directions, styles, or scenes.
- Keep the instruction under 30 words.
- Only return the exact text without any additional comments or explanations and in English.
`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      // temperature: 0.3,
      max_completion_tokens: 2000,
    });

    // Extracción del resultado
    const resultText = response.choices[0]?.message?.content || "";
    const trimmedText = resultText.slice(0, 512).replaceAll('"', "").trim();

    // Respuesta al cliente
    return new Response(JSON.stringify({ result: trimmedText }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    return Response.json(
      { error: "Error interno", details: (error as Error).message },
      { status: 500 }
    );
  }
});
