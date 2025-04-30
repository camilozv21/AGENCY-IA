// app/api/generate-nova/route.ts
"use server";

import { BedrockRuntimeClient, StartAsyncInvokeCommand } from '@aws-sdk/client-bedrock-runtime';

interface RequestBody {
  prompt: string;
  duration?: number;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { prompt, duration } = body;

  if (!prompt) {
    return Response.json({ error: '"Prompt" Field is required' }, { status: 400 });
  }

  if (typeof prompt !== 'string') {
    return Response.json({ error: '"Prompt" Field must be a string' }, { status: 400 });
  }

  if (!prompt.trim()) {
    return Response.json({ error: '"Prompt" Field cannot be empty' }, { status: 400 });
  }

  const client = new BedrockRuntimeClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_AWS!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
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
        durationSeconds: duration || 6,
        fps: 24,
        dimension: '1280x720',
        seed: 42,
      },
    },
    outputDataConfig: {
      s3OutputDataConfig: {
        s3Uri: process.env.BUCKET_S3_URI,
      },
    },
  });

  try {
    const response = await client.send(command);

    const invocationArn = response.invocationArn || '';
    const match = invocationArn.match(/invoke\/([^"]+)$/);
    const videoRequestId = match ? match[1] : '';
    const fileName = `https://df50lbm4qcrt6.cloudfront.net/${videoRequestId}/output.mp4`;
    return new Response(
      JSON.stringify({
        invocationArn: response.invocationArn,
        fileName, // Aquí se devuelve el ID limpio
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
        details: (error as unknown as Error).message,
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
