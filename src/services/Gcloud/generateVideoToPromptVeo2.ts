import { httpService } from "../common/http.service";
import { CreateVideotoPromptVeo2 } from "@/types/createVideoFromPromptVeo2.type";
import { Parameters } from "@/app/api/(GCLOUD)/veo2/route";
export async function generateVideoToVeo2({ prompt,parameters }: { prompt: string , parameters:Parameters }): Promise<{ success: boolean; data?: CreateVideotoPromptVeo2; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<CreateVideotoPromptVeo2>("/veo2", {prompt,parameters},{credentials:"include"});
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