import { Createimagefromprompticloud } from "@/types/createimagefromtextimagen4.type";
import { httpService } from "../common/http.service";
import { PromptSettings } from "@/app/api/(GCLOUD)/imagen4.0/route";
export async function generateImagen4({ promptSettings }: { promptSettings:PromptSettings }): Promise<{ success: boolean; data?: Createimagefromprompticloud; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<Createimagefromprompticloud>("/imagen4.0", {promptSettings},{credentials:"include"});
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