"use server";

import { cookies } from "next/headers";
import { AWSPromptImageGenerated } from "@/types/generetePromptTextImage";
import { httpService } from "../common/http.service";
import { PromptSettings } from "@/app/api/(AWS)/aws-text-video/generate-prompt-text-image/route";

export async function generetePromptTextImage({ promptSettings }: { promptSettings: PromptSettings }): Promise<{ success: boolean; data?: AWSPromptImageGenerated; error?: string }> {
    const cookie = (await cookies()).get('session')?.value
    try {
          const response = await httpService.post<AWSPromptImageGenerated>("/aws-text-video/generate-prompt-text-image", { ...promptSettings },{credentials:"include",headers:{"cookie":`session=${cookie}`}});
          return { success: true, data: response };
      } catch (error: unknown) {
          console.error("Error during image creation:", (error as Error).message);
          let errorMessage = "No se pudo generar la imagen. Por favor verifica los datos o contacta soporte." + error;
          if ((error as Error).message.includes("400")) {
              errorMessage = error + "Error de validación: revisa que los datos ingresados sean correctos.";
          } else if ((error as Error).message.includes("401")) {
              errorMessage = "No autorizado: verifica tu sesión.";
          } else if ((error as Error).message.includes("500")) {
              errorMessage = "Error interno del servidor. Inténtalo más tarde.";
          }
          return { success: false, error: errorMessage };
      }
}