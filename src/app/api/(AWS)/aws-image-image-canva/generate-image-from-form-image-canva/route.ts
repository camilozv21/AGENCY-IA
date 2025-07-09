import { auth } from "@/auth";
import { validateTokens } from "@/helpers/validateTokens";
import {generateImagesFromImagesCanvas} from "@/services/aws/generateImageFromImageCanva"
import { generetePromptTextImage } from "@/services/aws/generetePromptTextImage"
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

interface RequestBody{
    prompt:string;
    imageBase64:string;
    settings:Settings;
    typeTask:string;
    maskPrompt?:string; 
}

export interface Settings {
    style: string;
    aspectRatio: string;
    lighting: string;
    camera: string;
    numberOfImages: number;
}

export const POST = auth(async (request: NextAuthRequest) => {
  const session = request.auth;

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

    try{
      
        const body: RequestBody = await request.json();
        const { prompt, imageBase64, settings, typeTask ,maskPrompt} = body;

        const isValidTokens = await validateTokens(session.user.email || "", settings.numberOfImages*100);
    
        if (!isValidTokens) {
            return new NextResponse("Not enough tokens", { status: 403 });
        }

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
            typeTask:typeTask,
            maskPrompt: maskPrompt
        }
        const generateImageFromImage = await generateImagesFromImagesCanvas({ imageSettings });
        return Response.json(generateImageFromImage, { status: 200 });
   
    } catch (error: unknown) {
        return Response.json({ error: 'Error interno', details: (error as Error).message, success: false, }, { status: 500 });
    }
});

