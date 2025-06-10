import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

export const POST = auth(async (request: NextAuthRequest) => {
    try {
        const body = await request.json();

        const { instances, parameters } = body;
        if (!instances || !parameters) {
            return new NextResponse("Faltan parámetros requeridos", { status: 400 });
        }

        const PROJECT_ID = "contia-461315";
        const LOCATION_ID = "us-central1";
        const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
        const MODEL_ID = "veo-2.0-generate-001";

        const predictBody = {
            endpoint: `projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}`,
            instances,
            parameters,
        };

        // Obtener el token usando google-auth-library
        const auth = new GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        if (!accessToken || !accessToken.token) {
            return new NextResponse("No se pudo obtener el token de autenticación", { status: 500 });
        }

        // Llamada a predictLongRunning
        const predictResponse = await fetch(
            `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predictLongRunning`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken.token}`,
                },
                body: JSON.stringify(predictBody),
            }
        );

        if (!predictResponse.ok) {
            const errorText = await predictResponse.text();
            return new NextResponse(errorText, { status: predictResponse.status });
        }

        const predictData = await predictResponse.json();
        const operationId = predictData.name;

        if (!operationId) {
            return new NextResponse("No se obtuvo operationId", { status: 500 });
        }

        const fetchBody = { operationName: operationId };

        // Llamada a fetchPredictOperation
        const fetchResponse = await fetch(
            `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:fetchPredictOperation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken.token}`,
                },
                body: JSON.stringify(fetchBody),
            }
        );

        if (!fetchResponse.ok) {
            const errorText = await fetchResponse.text();
            return new NextResponse(errorText, { status: fetchResponse.status });
        }

        const fetchData = await fetchResponse.json();
        return NextResponse.json(fetchData);

    } catch (error) {
        console.error("Error en la API:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
});
