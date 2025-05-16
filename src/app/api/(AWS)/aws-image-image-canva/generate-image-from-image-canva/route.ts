"use server";

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { applyStyleToPrompt } from "@/utils/applyStyleToPrompt";
import { getDimensions } from "@/utils/getDimensions";
import { getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export interface ImageSetting {
  prompt: string;
  imageBase64: string;
  settings: {
    style: string;
    aspectRatio: string;
    numberOfImages: number;
  };
}


export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
      return new Response('Unauthorized', { status: 401 })
  }
  try{
    const body: ImageSetting = await request.json();
    const { prompt, imageBase64, settings } = body;
    
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json({ error: '"prompt" field is required and must be a non-empty string' }, { status: 400 });
    }
    if (!imageBase64 || typeof imageBase64 !== "string" || !imageBase64.trim()) {
      return Response.json({ error: '"imageBase64" field is required and must be a non-empty string' }, { status: 400 });
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
      taskType: "IMAGE_VARIATION",
      imageVariationParams: {
        images:[imageBase64],
        similarityStrength: 0.8,
        text: styledPrompt,
        negativeText: "blurry, distorted, low quality",
      },
      imageGenerationConfig: {
        quality: "premium",
        numberOfImages: settings.numberOfImages || 3,
        height,
        width,
        cfgScale: 7.5,
        seed: Math.floor(Math.random() * 1000)
      },
    };
  
    const command = new InvokeModelCommand({
      modelId: "amazon.nova-canvas-v1:0",
      contentType: "application/json",
      accept: "image/png",
      body: JSON.stringify(payload),
    });
  
    try {
      const response = await client.send(command);
  
      return new Response(response.body, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
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

  }catch (error: unknown) {
    return Response.json({ error: 'Error interno', details: (error as Error).message }, { status: 500 });
}
 
}
