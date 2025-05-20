"use server"

import { validateTokens } from "@/helpers/validateTokens";
import { getSession } from "@/lib/session";
import {generateImagesFromImagesCanvas} from "@/services/aws/generateImageFromImageCanva"
import { generetePromptTextImage } from "@/services/aws/generetePromptTextImage"
import { NextRequest } from "next/server";

interface RequestBody{
    prompt:string;
    imageBase64:string;
    settings:Settings;
    typeTask:string; 
}

export interface Settings {
    style: string;
    aspectRatio: string;
    lighting: string;
    camera: string;
    numberOfImages: number;
}

export async function POST(request: NextRequest){
    const session = await getSession(request);
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }
    
    const isTokenValid = await validateTokens(session.userId, 100);
    if (!isTokenValid) {
        return new Response('Not enough tokens', { status: 403 })
    }
    try{
      
        const body: RequestBody = await request.json();
        const { prompt, imageBase64, settings, typeTask} = body;

        if (!prompt) {
            return Response.json({ error: '"Prompt" Field is required' }, { status: 400 });
            }
        
        if (typeof prompt !== 'string') {
            return Response.json({ error: '"Prompt" Field must be a string' }, { status: 400 });
        }
        if (typeof imageBase64 !== 'string') {
            return Response.json({ error: '"Image" Field must be a string' }, { status: 400 });
        }

        const promptSettings = {
            prompt,        
            settings:{
                lighting:settings.lighting,
                camera:settings.camera,
                
            }
        }
        const formTextImageFromPrompt = await generetePromptTextImage({ promptSettings });

        const imageSettings = {
            prompt: formTextImageFromPrompt.data?.result || "",      
            imageBase64,
            settings:{
                style:settings.style,
                aspectRatio:settings.aspectRatio || "1:1",
                numberOfImages:settings.numberOfImages || 3
            },
            typeTask:typeTask
        }
        const generateImageFromImage = await generateImagesFromImagesCanvas({ imageSettings });
        return Response.json(generateImageFromImage, { status: 200 });
   
    } catch (error: unknown) {
        return Response.json({ error: 'Error interno', details: (error as Error).message }, { status: 500 });
    }
}

