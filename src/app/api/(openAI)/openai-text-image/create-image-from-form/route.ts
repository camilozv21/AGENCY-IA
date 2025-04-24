"use server"

import { formTextImage } from "@/services/openAI/formTextImage";
import { generateImageFromPrompt } from "@/services/openAI/generateImageFromPrompt";
import { generatePromptTextImage } from "@/services/openAI/generatePromptTextImage";

interface RequestBody {
  prompt: string;
}

export async function POST(request: Request) {
    try {
      const body: RequestBody = await request.json();
      const { prompt }: { prompt: string } = body;

      if (!prompt) {
        return Response.json({ error: '"Prompt" Field is required' }, { status: 400 });
      }
  
      if (typeof prompt !== 'string') {
        return Response.json({ error: '"Prompt" Field must be a string' }, { status: 400 });
      }
      
      const formTextImageResponse = await formTextImage({ prompt });
  
      const generatePromptTextImageResponse = await generatePromptTextImage({ prompt: formTextImageResponse.output_text });

      const dalleResponse = await generateImageFromPrompt({ prompt: generatePromptTextImageResponse.output_text });

      return Response.json(dalleResponse, { status: 200 });
  
    } catch (error: unknown) {
      return Response.json({ error: 'Error interno', details: (error as Error).message }, { status: 500 });
    }
  }
  