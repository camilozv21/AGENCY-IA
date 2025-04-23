// app/api/generate-nova/route.ts
"use server";

import { BedrockRuntimeClient, StartAsyncInvokeCommand } from '@aws-sdk/client-bedrock-runtime';

interface RequestBody {
  prompt: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { prompt } = body;

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = new BedrockRuntimeClient({
    region: 'us-east-1', // Asegúrate de que coincida con tu bucket
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new StartAsyncInvokeCommand({
    modelId: 'amazon.nova-reel-v1:1',
    modelInput: {
      taskType: 'TEXT_VIDEO',
      textToVideoParams: {
        text: prompt,
      },
      videoGenerationConfig: {
        durationSeconds: 6,
        fps: 24,
        dimension: '1280x720',
        seed: 42,
      },
    },
    outputDataConfig: {
      s3OutputDataConfig: {
        s3Uri: 's3://tu-bucket-de-salida', // Cambia esto por el tuyo
      },
    },
  });

  try {
    const response = await client.send(command);

    return new Response(
      JSON.stringify({
        invocationArn: response.invocationArn,
        message: 'Video request enviado correctamente',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error al generar el video:', error);
    return new Response(
      JSON.stringify({
        error: 'Error al generar el video',
        details: (error as any).message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
