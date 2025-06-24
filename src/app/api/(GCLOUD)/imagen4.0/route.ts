import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import { validateTokens } from "@/helpers/validateTokens";

const PROJECT_ID = "contia-461315";
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const MODEL_ID = "imagen-4.0-ultra-generate-exp-05-20";

export interface PromptSettings {
  prompt: string;
  parameters: {
    aspectRatio: string;
    sampleCount: number;
    safetySetting: string;
    personGeneration: string;
    includeRaiReason: boolean;
    includeSafetyAttributes: boolean;
  };
}

export const POST = auth(async (request: NextAuthRequest) => {
  const session = request.auth;

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: PromptSettings = await request.json();
  const { prompt, parameters } = body;

  const isValidTokens = await validateTokens(
    session.user.email || "",
    parameters.sampleCount * 27
  );

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

    const requestPayload = {
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}`,
      instances: [
        {
          prompt: prompt,
        },
      ],
      parameters: {
        aspectRatio: parameters.aspectRatio,
        sampleCount: 1,
        safetySetting: "block_only_high",
        personGeneration: "allow_adult",
        includeRaiReason: false,
        includeSafetyAttributes: false,
      },
    };

    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`;

    
    const response = await client.request<{
      name: string;
    }>({
      url,
      method: "POST",
      data: requestPayload,
    });

    return NextResponse.json(
      {
        result: response.data,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during image generation:", error);
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: (error as Error).message,
        success: false,
      },
      { status: 500 }
    );
  }
});
