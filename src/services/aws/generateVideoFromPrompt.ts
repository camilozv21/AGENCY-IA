import { httpService } from "../common/http.service";
import {GenerateVideoTopromptAWS} from "@/types/generateVideoFromPrompt.type"
export async function genereteVideoToPromptAWS({ prompt,duration,image }: { prompt: string , duration:string, image:string }): Promise<{ success: boolean; data?: GenerateVideoTopromptAWS; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<GenerateVideoTopromptAWS>("aws-text-video/generate-video-from-prompt", {prompt,duration,image},{credentials:"include"});
          if (response.success === false) {
            return { success: false, error: response.error || "No se pudo generar el Video" };
          }
          return { success: true, data: response };
      } catch (error: unknown) {
          console.error("Error during Video creation:", (error as Error).message);
          let errorMessage = "No se pudo generar El Video. Por favor verifica los datos o contacta soporte.";
          if ((error as Error).message.includes("400")) {
              errorMessage =  error + "Error de validación: revisa que los datos ingresados sean correctos.";
          } else if ((error as Error).message.includes("401")) {
              errorMessage = "No autorizado: verifica tu sesión.";
          } else if ((error as Error).message.includes("403")) {
              errorMessage = "No suficientes tokens.";
          } else if ((error as Error).message.includes("500")) {
              errorMessage = "Error interno del servidor. Inténtalo más tarde.";
            }
          return { success: false, error: errorMessage };
      }
}