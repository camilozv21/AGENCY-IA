// app/api/generate-nova/route.ts
"use server";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  GetAsyncInvokeCommand,
  StartAsyncInvokeCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { auth } from "@/auth";
import { validateTokens } from "@/helpers/validateTokens";
interface RequestBody {
  prompt: string;
  duration: number;
  image: string;
}

const SLEEP_SECONDS = 30;

export const POST = auth(async (request: NextAuthRequest) => {
  const session = request.auth;

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: RequestBody = await request.json();
  const { prompt, duration, image } = body;

  const isValidTokens = await validateTokens(
    session.user.email || "",
    duration * 27
  );

  if (!isValidTokens) {
    return new NextResponse("Not enough tokens", { status: 403 });
  }

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const client = new BedrockRuntimeClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_AWS!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
      },
    });

    const formatMatch = image.match(/^data:image\/(\w+);base64,/);
    const format = formatMatch ? formatMatch[1] : "jpeg";

    const command = new StartAsyncInvokeCommand({
      modelId: "amazon.nova-reel-v1:1",
      modelInput: {
        taskType: "TEXT_VIDEO",
        textToVideoParams: {
          text: prompt,
          images: [
            {
              format,
              source: {
                bytes: image.replace(/^data:image\/\w+;base64,/, ""),
              },
            },
          ],
        },
        videoGenerationConfig: {
          durationSeconds: duration || 6,
          fps: 24,
          dimension: "1280x720",
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
    const invocationArn = response.invocationArn || "";
    const match = invocationArn.match(/invoke\/([^"]+)$/);
    const videoRequestId = match ? match[1] : "";
    const fileName = `https://d23wy7ffkttxiu.cloudfront.net/${videoRequestId}/output.mp4`;
    
    let status = "InProgress";
    let getAsyncResponse;
    while (status === "InProgress") {
      await new Promise((resolve) => setTimeout(resolve, SLEEP_SECONDS * 1000));
      const getAsyncCommand = new GetAsyncInvokeCommand({
        invocationArn,
      });
      getAsyncResponse = await client.send(getAsyncCommand);
      status = getAsyncResponse.status || "InProgress";
      // Puedes agregar logs aquí si lo deseas
    }

    if (status === "Completed") {
      return new Response(
        JSON.stringify({
          invocationArn: response.invocationArn,
          fileName,
          message: "Video generado correctamente",
          success: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          error: "La generación del video falló",
          details: getAsyncResponse,
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error al generar el video:", error);
    console.error("Error during video generation:", error);
    return NextResponse.json(
      {
        error: "Failed to generate video",
        details: (error as Error).message,
        success: false,
      },
      { status: 500 }
    );
  }
});
