import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";  // Importar la librería Google Auth
import { boolean } from "zod";

const PROJECT_ID = "contia-461315";
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const MODEL_ID = "veo-2.0-generate-001";
export interface VideoSettings{
  prompt:string;
  parameters:Parameters;
}

export interface Parameters {
    aspectRatio:string;
    sampleCount: number;
    durationSeconds: number;
    personGeneration: string;
    enablePromptRewriting: boolean;
    addWatermark: boolean;
}
export const POST = auth(async (request: NextAuthRequest) => {
   const body: VideoSettings = await request.json();
   const { prompt,parameters } = body;

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required" },
      { status: 400 }
    );
  }

  try {
    const keys = JSON.parse(process.env.CREDS || "{}");
    const client = new JWT({
      email: keys.client_email,
      key: keys.private_key.split(String.raw`\n`).join('\n'),
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const requestPayload = {
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}`,
      instances: [
        {
          prompt: prompt,
        },
      ],
      parameters: parameters,
    };

    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predictLongRunning`;

    const response = await client.request<{
      name: string;
    }>({
      url,
      method: "POST",
      data: requestPayload,
    });

    const operationId = response.data.name;
    
    return NextResponse.json({
      operationId,
      message: "Video generation in progress. Use the operation ID to fetch the result.",
      success: true,
    }, { status: 200 });

  } catch (error) {
    console.error("Error during video generation:", error);
    return NextResponse.json(
      { error: "Failed to generate video", details: (error as Error).message, success: false },
      { status: 500 }
    );
  }
});
