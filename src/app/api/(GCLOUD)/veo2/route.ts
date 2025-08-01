import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library"; // Importar la librería Google Auth
import { validateTokens } from "@/helpers/validateTokens";
import { subtractTokens } from "@/helpers/subtractTokens";

const PROJECT_ID = "contia-461315";
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
//const MODEL_ID = "veo-2.0-generate-001";
export interface VideoSettings {
  prompt: string;
  parameters: Parameters;
  image: string;
  model: string;
}

export interface Parameters {
  aspectRatio: string;
  sampleCount: number;
  durationSeconds: number;
  personGeneration: string;
  enablePromptRewriting: boolean;
  addWatermark: boolean;
}

export const POST = auth(async (request: NextAuthRequest) => {
  const session = request.auth;

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: VideoSettings = await request.json();
  const { prompt, parameters, image, model } = body;
  let cleanBase64 = "";
  if (image.startsWith("http")) {
    // Descarga la imagen y la convierte a base64
    const imageResponse = await fetch(image);
    if (!imageResponse.ok) {
      return new NextResponse("Error fetching image from URL", { status: 400 });
    }
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    cleanBase64 = buffer.toString("base64");
  }
  const tokenCount = model === 'Veo 2' ? parameters.durationSeconds * 112.5 : parameters.durationSeconds * 225;
  const isValidTokens = await validateTokens(session.user.email || "", tokenCount);

  if (!isValidTokens) {
    return new NextResponse("Not enough tokens", { status: 403 });
  }

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const keys = JSON.parse(process.env.CREDS || "{}");
    const client = new JWT({
      email: keys.client_email,
      key: keys.private_key.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    let requestPayload;
    const modelName = model === 'Veo 2' ? 'veo-2.0-generate-001' : 'veo-3.0-generate-preview';

    if (image) {
      requestPayload = {
        endpoint: `projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${modelName}`,
        instances: [
          {
            prompt: prompt,
            image: {
              bytesBase64Encoded: cleanBase64, 
              mimeType: "image/jpeg"
            }
          },
        ],
        parameters: {
          aspectRatio: parameters.aspectRatio,
          sampleCount: 1,
          durationSeconds: 5,
          personGeneration: "allow_adult",
          enablePromptRewriting: true,
          addWatermark: false,
          ...(model === 'Veo 3' ? { generateAudio: true } : {}),
        },
      };
    } else {
      requestPayload = {
        endpoint: `projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${modelName}`,
        instances: [
          {
            prompt: prompt,
          },
        ],
        parameters: {
          aspectRatio: parameters.aspectRatio,
          sampleCount: 1,
          durationSeconds: 5,
          personGeneration: "allow_adult",
          enablePromptRewriting: true,
          addWatermark: false,
          ...(model === 'Veo 3' ? { generateAudio: true } : {}),
        },
      };
    }

    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${modelName}:predictLongRunning`;

    const response = await client.request<{
      name: string;
    }>({
      url,
      method: "POST",
      data: requestPayload,
    });

    const operationId = response.data.name;

    await subtractTokens(session.user.email || "", tokenCount);
    return NextResponse.json(
      {
        operationId,
        message:
          "Video generation in progress. Use the operation ID to fetch the result.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
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
