// app/api/generate-nova/route.ts
"use server";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { BedrockRuntimeClient, StartAsyncInvokeCommand } from '@aws-sdk/client-bedrock-runtime';
import { auth } from "@/auth";
interface RequestBody {
  prompt: string;
  duration: number;
  image:string;
}

export  const POST = auth(async (request: NextAuthRequest) => {
  const body: RequestBody = await request.json();
  const { prompt, duration, image } = body;

 if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required" },
      { status: 400 }
    );
  }



  try {
   
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
          Image:image,
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
    const response = await client.send(command);
    const invocationArn = response.invocationArn || '';
    const match = invocationArn.match(/invoke\/([^"]+)$/);
    const videoRequestId = match ? match[1] : '';
    const fileName = `https://d23wy7ffkttxiu.cloudfront.net/${videoRequestId}/output.mp4`;
    return new Response(
      JSON.stringify({
        invocationArn: response.invocationArn,
        fileName, // Aquí se devuelve el ID limpio
        message: 'Video request enviado correctamente',
        success: true,
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
    console.error("Error during video generation:", error);
    return NextResponse.json(
      { error: "Failed to generate video", details: (error as Error).message, success: false },
      { status: 500 }
    );
  }
})
