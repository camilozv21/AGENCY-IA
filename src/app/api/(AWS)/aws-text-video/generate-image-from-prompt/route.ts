"use server";

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { applyStyleToPrompt } from "@/utils/applyStyleToPrompt";
import { getDimensions } from "@/utils/getDimensions";

export interface ImageSettings {
  prompt: string;
  settings: {
    style: string;
    aspectRatio: string;
  };
}


export async function POST(request: Request) {
  const body: ImageSettings = await request.json();
  const { prompt, settings } = body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return Response.json({ error: '"prompt" field is required and must be a non-empty string' }, { status: 400 });
  }

  const isSettingsValid =
    settings &&
    typeof settings.style === "string" &&
    typeof settings.aspectRatio === "string";

  if (!isSettingsValid) {
    return Response.json({ error: '"settings" object is invalid or incomplete' }, { status: 400 });
  }

  const { width, height } = getDimensions(settings.aspectRatio);
  const styledPrompt = applyStyleToPrompt(prompt, settings.style); 

  const client = new BedrockRuntimeClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_AWS!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
    },
  });

  const payload = {
    taskType: "TEXT_IMAGE",
    textToImageParams: {
      text: styledPrompt,
      negativeText: "blurry, distorted, low quality",
    },
    imageGenerationConfig: {
      quality: "premium",
      numberOfImages: 1,
      height,
      width,
      cfgScale: 5.0,
      seed: 42,
    },
  };

  const command = new InvokeModelCommand({
    modelId: "amazon.titan-image-generator-v2:0",
    contentType: "application/json",
    accept: "image/png",
    body: JSON.stringify(payload),
  });

  try {
    const response = await client.send(command);

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "JSON.stringify",
      },
    });
  } catch (error) {
    console.error("Error al generar imagen:", error);
    return new Response(
      JSON.stringify({
        error: "Error al generar la imagen",
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
