export async function POST(request: Request) {
    try {
      const body = await request.json();
      const message: string = body.message;
  
      if (typeof message !== 'string') {
        return Response.json({ error: 'El campo "message" debe ser un string' }, { status: 400 });
      }
  
      
      const userpromptResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userprompt`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usermessages: message }), 
      });
  
      if (!userpromptResponse.ok) {
        const errorText = await userpromptResponse.text();
        return Response.json({ error: 'Error en userprompt', details: errorText }, { status: 502 });
      }
  
      const userprompt1Data = await userpromptResponse.json();
  
      // Asegúrate de extraer correctamente el contenido del prompt
      const outputFromuserprompt1Data = userprompt1Data.text;
  
      // Llamada a la API 2 usando el resultado de la API 1
      const openaiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usermessages: outputFromuserprompt1Data }),
      });
  
      if (!openaiResponse.ok) {
        const errorText = await openaiResponse.text();
        return Response.json({ error: 'Error en la API 2', details: errorText }, { status: 502 });
      }
  
      const finalResult = await openaiResponse.json();
  
      return Response.json(finalResult, { status: 200 });
  
    } catch (error: any) {
      return Response.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
  }
  