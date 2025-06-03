import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { applyStyleToPrompt } from "@/utils/applyStyleToPrompt";
import { getDimensions } from "@/utils/getDimensions";
import { NextResponse } from "next/server";
import { applyselectPayload } from "@/helpers/selectPayload";
import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
export interface ImageSetting {
  prompt: string;
  imageBase64: string;
  settings: {
    style: string;
    aspectRatio: string;
    numberOfImages: number;
  }
  typeTask:string;
}


export const POST = auth(async (request: NextAuthRequest) => {
  const session = request.auth;

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try{
    const body: ImageSetting = await request.json();
    const { prompt,imageBase64 , settings, typeTask } = body;
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json({ error: '"prompt" field is required and must be a non-empty string' }, { status: 400 });
    }
    if (!cleanBase64 || typeof cleanBase64 !== "string" || !cleanBase64.trim()) {
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
    const payload = applyselectPayload(typeTask, cleanBase64, prompt, styledPrompt, settings.numberOfImages, height, width ); 
    const client = new BedrockRuntimeClient({
      region: 'us-east-1',
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
          success: false,
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
      return new Response(JSON.stringify({ error: 'Error interno', details: (error as Error).message, success: false, }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
 
});
