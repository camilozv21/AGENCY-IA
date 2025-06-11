import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

const PROJECT_ID = "contia-461315";
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const MODEL_ID = "veo-2.0-generate-001";

export const POST = auth(async (request: NextAuthRequest) => {
  const { operationId } = await request.json();

  if (!operationId) {
    return NextResponse.json({ error: "operationId is required" }, { status: 400 });
  }

  try {
    // Leer credenciales desde la variable de entorno
    const keys = JSON.parse(process.env.CREDS || "{}");
    const client = new JWT({
      email: keys.client_email,
      key: keys.private_key.split(String.raw`\n`).join('\n'),
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:fetchPredictOperation`;

    const requestPayload = {
      operationName: operationId,
    };

    const response = await client.request({
      url,
      method: "POST",
      data: requestPayload,
    });

    // Retornar el estado o el contenido (videos en base64)
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Error fetching video result:", error);
    return NextResponse.json(
      { error: "Failed to fetch operation status", details: (error as Error).message },
      { status: 500 }
    );
  }
});
