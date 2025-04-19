"use server"

import { Dalle3 } from "@/types/dalle.types";
import { Gtp4Turbo } from "@/types/openai.types";

interface RequestBody {
  prompt: string;
}

export async function POST(request: Request) {
    try {
      const body: RequestBody = await request.json();
      const { prompt }: { prompt: string } = body;
  
      if (typeof prompt !== 'string') {
        return Response.json({ error: 'El campo "message" debe ser un string' }, { status: 400 });
      }
      
      const userpromptResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userprompt`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }), 
      });
  
      if (!userpromptResponse.ok) {
        const errorText = await userpromptResponse.text();
        return Response.json({ error: 'Error en userprompt', details: errorText }, { status: 502 });
      }
  
      const userprompt1Data: Gtp4Turbo = await userpromptResponse.json();
  
      const outputFromuserprompt1Data = userprompt1Data.output_text;

      const openaiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: outputFromuserprompt1Data }),
      });
  
      if (!openaiResponse.ok) {
        const errorText = await openaiResponse.text();
        return Response.json({ error: 'Error en la API 2', details: errorText }, { status: 502 });
      }
  
      const promptDalle: Gtp4Turbo = await openaiResponse.json();

      const dalleResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/opendalle`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptDalle.output_text }), 
      });

      const dataImage: Dalle3 = await dalleResponse.json();
  
      return Response.json(dataImage, { status: 200 });
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Response.json({ error: 'Error interno', details: error.message }, { status: 500 });
      }
      return Response.json({ error: 'Error interno', details: 'Unknown error' }, { status: 500 });
    }
  }
  