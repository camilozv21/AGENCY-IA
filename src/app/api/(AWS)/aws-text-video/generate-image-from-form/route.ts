"use server"

import { getSession } from "@/lib/session";
import { generateImagesFromPrompt } from "@/services/aws/generateImagesFromPrompt"
import { generetePromptTextImage } from "@/services/aws/generetePromptTextImage"
import { NextRequest } from "next/server";

interface RequestBody {
    prompt: string;
    settings:SettingsBody;
}
interface SettingsBody{    
    style: string;
    aspectRatio: string;
    type: string;
    lighting: string;
    camera: string;  
}

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
            type:settings.type,
            lighting:settings.lighting,
            camera:settings.camera
        }
    }
    const formTextImageFromPrompt = await generetePromptTextImage({ promptSettings });
    const imageSettings = {
        prompt: formTextImageFromPrompt.data?.output_text || "",        
        settings:{
            style:settings.style,
            aspectRatio:settings.aspectRatio,
        }
    }
    const generateImageFromPrompt = await generateImagesFromPrompt({ imageSettings });

    return Response.json(generateImageFromPrompt, { status: 200 });

} catch (error: unknown) {
    return Response.json({ error: 'Error interno', details: (error as Error).message }, { status: 500 });
}
}