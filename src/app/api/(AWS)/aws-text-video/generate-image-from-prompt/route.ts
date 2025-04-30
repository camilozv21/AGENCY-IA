// app/api/generate-titan/route.ts
"use server";

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

interface RequestBody {
  prompt: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { prompt } = body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return Response.json({ error: '"prompt" field is required and must be a non-empty string' }, { status: 400 });
  }

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
      text: prompt,
      negativeText: "blurry, distorted, cartoon, low quality",
    },
    imageGenerationConfig: {
      quality: "standard",
      numberOfImages: 1,
      height: 1024,
      width: 1024,
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
        "Content-Type": "image/png", 
      },
    });
  } catch (error) {
    console.error("Error al generar imagen:", error);
    return new Response(
      JSON.stringify({
        error: "Error al generar la imagen",
        details: (error as unknown as Error).message,
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
