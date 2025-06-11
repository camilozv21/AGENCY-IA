import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";  // Importar la librería Google Auth

const PROJECT_ID = "contia-461315";
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const MODEL_ID = "veo-2.0-generate-001";

// Función que maneja el endpoint POST
export const POST = auth(async (request: NextAuthRequest) => {
  // Obtenemos el body de la solicitud
  const { prompt } = await request.json();

  // Validar el prompt
  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required" },
      { status: 400 }
    );
  }

  try {
    // Cargar las credenciales desde las variables de entorno
    const keys = JSON.parse(process.env.CREDS || "{}");
    const client = new JWT({
      email: keys.client_email,
      key: keys.private_key.split(String.raw`\n`).join('\n'),
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    // Solicitar la predicción al modelo de Google AI Platform
    const requestPayload = {
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}`,
      instances: [
        {
          prompt: prompt,
        },
      ],
      parameters: {
        aspectRatio: "9:16",
        sampleCount: 1,
        durationSeconds: 5,
        personGeneration: "allow_adult",
        enablePromptRewriting: true,
        addWatermark: true,
        // includeRaiReason: true,
      },
    };

    // Realizamos la llamada a la API para generar el video
    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predictLongRunning`;

    const response = await client.request<{
      data: {
        name: string;
      };
    }>({
      url,
      method: "POST",
      data: requestPayload,
    });
console.log(response);
    const operationId = response.data.name;
    
    // Retornamos el ID de la operación
    return NextResponse.json({
      operationId,
      message: "Video generation in progress. Use the operation ID to fetch the result.",
    }, { status: 200 });

  } catch (error) {
    console.error("Error during video generation:", error);
    return NextResponse.json(
      { error: "Failed to generate video", details: (error as Error).message },
      { status: 500 }
    );
  }
});
