"use server"

import { getSession } from "@/lib/session";
import { generateImagesFromPromptCanva } from "@/services/aws/generateImageFromPromptCanva"
import { generetePromptTextImage } from "@/services/aws/generetePromptTextImage"
import { NextRequest } from "next/server";

export interface Prompt {
    prompt: string;
  }
  
export interface Settings {
    settings: {
        style: string;
        aspectRatio: string;
        lighting: string;
        camera: string;
        numberOfImages: number;
    };
}
export interface RequestBody extends Prompt, Settings {}

export async function POST(request: NextRequest) {
const session = await getSession(request);
if (!session) {
    return new Response('Unauthorized', { status: 401 })
}

try {
    const body: RequestBody = await request.json();
    const { prompt, settings } = body;

    if (!prompt) {
    return Response.json({ error: '"Prompt" Field is required' }, { status: 400 });
    }

    if (typeof prompt !== 'string') {
    return Response.json({ error: '"Prompt" Field must be a string' }, { status: 400 });
    }
    const promptSettings = {
        prompt,        
        settings:{
            lighting:settings.lighting,
            camera:settings.camera,
            
        }
    }

    const formTextImageFromPrompt = await generetePromptTextImage({ promptSettings });
    console.log (formTextImageFromPrompt)
    const imageSettings = {
        prompt: formTextImageFromPrompt.data?.result || "",      
        settings:{
            style:settings.style,
            aspectRatio:settings.aspectRatio || "1:1",
            numberOfImages:settings.numberOfImages || 3
        }
    }
    const generateImageFromPromptCanva = await generateImagesFromPromptCanva({ imageSettings });

    return Response.json(generateImageFromPromptCanva, { status: 200 });

} catch (error: unknown) {
    return Response.json({ error: 'Error interno', details: (error as Error).message }, { status: 500 });
}
}