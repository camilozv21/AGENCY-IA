import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { applyStyleToPrompt } from "@/utils/applyStyleToPrompt";
import { getDimensions } from "@/utils/getDimensions";
import { applyselectPayload } from "@/helpers/selectPayload";
import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";

export interface ImageSetting {
  prompt: string;
  imageBase64: string; // Aquí recibimos la URL, pero el campo se sigue llamando imageBase64
  settings: {
    style: string;
    aspectRatio: string;
    numberOfImages: number;
  };
  typeTask: string;
  maskPrompt?:string;
}

export const POST = auth(async (request: NextAuthRequest) => {
  try {
    const body: ImageSetting = await request.json();
    const { prompt, imageBase64, settings, typeTask, maskPrompt } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json({ error: '"prompt" field is required and must be a non-empty string' }, { status: 400 });
    }
    if (!imageBase64 || typeof imageBase64 !== "string" || !imageBase64.trim()) {
      return Response.json({ error: '"imageBase64" field is required and must be a non-empty string (URL)' }, { status: 400 });
    }
    const isSettingsValid =
      settings &&
      typeof settings.style === "string" &&
      typeof settings.aspectRatio === "string";
    if (!isSettingsValid) {
      return Response.json({ error: '"settings" object is invalid or incomplete' }, { status: 400 });
    }

    // Validar que la URL provenga de tu CloudFront
    const allowedPrefix = "https://df50lbm4qcrt6.cloudfront.net/";
    if (!imageBase64.startsWith(allowedPrefix)) {
      return Response.json({ error: 'Invalid image URL. Must be from your CloudFront domain.' }, { status: 400 });
    }

    // Descargar la imagen desde CloudFront
    const imageRes = await fetch(imageBase64);
    if (!imageRes.ok) {
      console.error("Error al descargar la imagen desde CloudFront:", imageRes.status, imageRes.statusText);
      return Response.json({ error: 'Could not download the image from CloudFront' }, { status: 500 });
    }

    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convertir la imagen descargada a base64 limpio
    const cleanBase64 = buffer.toString("base64");

    // Calcular dimensiones y prompt estilizado
    const { width, height } = getDimensions(settings.aspectRatio);
    const styledPrompt = applyStyleToPrompt(prompt, settings.style);

    // Construir payload con imagen en base64
    const payload = applyselectPayload(
      typeTask,
      cleanBase64,
      prompt,
      styledPrompt,
      settings.numberOfImages,
      height,
      width,
      maskPrompt
    );

    const client = new BedrockRuntimeClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_AWS!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
      },
    });

    const command = new InvokeModelCommand({
      modelId: "amazon.nova-canvas-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    try {
      const response = await client.send(command);

      return new Response(response.body, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al generar imagen:", error);
      return new Response(
        JSON.stringify({
          error: "Error al generar la imagen",
          details: (error as Error).message,
          success: false,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error: unknown) {
    console.error("Error interno en el endpoint:", error);
    return new Response(
      JSON.stringify({
        error: "Error interno",
        details: (error as Error).message,
        success: false,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
