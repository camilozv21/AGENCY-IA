"use server";

import { cookies } from "next/headers";
import { httpService } from "../common/http.service";
import { Prompt,Settings} from "@/app/api/(AWS)/aws-text-image-canva/generate-image-from-form-canva/route";
import { GenerateImageFromFormCanva } from "@/types/generateImageFromFormCanva.type";

export async function generateImagesFromFormCanva({ prompt,settings }: { prompt: Prompt,settings: Settings}): Promise<{ success: boolean; data?: GenerateImageFromFormCanva; error?: string }> {
    const cookie = (await cookies()).get('session')?.value
    try {
          const response = await httpService.post<GenerateImageFromFormCanva>("/aws-text-image-canva/generate-image-from-form-canva", {prompt,settings},{credentials:"include",headers:{"cookie":`session=${cookie}`}});
          return { success: true, data: response };
      } catch (error: unknown) {
          console.error("Error during image creation:", (error as Error).message);
          let errorMessage = "No se pudo generar la imagen. Por favor verifica los datos o contacta soporte.";
          if ((error as Error).message.includes("400")) {
              errorMessage =  error + "Error de validación: revisa que los datos ingresados sean correctos.";
          } else if ((error as Error).message.includes("401")) {
              errorMessage = "No autorizado: verifica tu sesión.";
          } else if ((error as Error).message.includes("500")) {
              errorMessage = "Error interno del servidor. Inténtalo más tarde.";
            }
          return { success: false, error: errorMessage };
      }
}