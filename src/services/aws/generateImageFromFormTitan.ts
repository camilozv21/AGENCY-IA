import { httpService } from "../common/http.service";
import { Settings} from "@/app/api/(AWS)/aws-text-image-titan/generate-image-from-form-titan/route";
import { GenerateImageFromFormTitan } from "@/types/generateImageFromFormTitan.type";

export async function generateImagesFromFormTitan({ prompt,settings }: { prompt: string ,settings: Settings}): Promise<{ success: boolean; data?: GenerateImageFromFormTitan; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<GenerateImageFromFormTitan>("/aws-text-image-titan/generate-image-from-form-titan", {prompt,settings},{credentials:"include"});
          return { success: true, data: response };
      } catch (error: unknown) {
          console.error("Error during image creation:", (error as Error).message);
          let errorMessage = "No se pudo generar la imagen. Por favor verifica los datos o contacta soporte.";
          if ((error as Error).message.includes("400")) {
              errorMessage = (error as Error).message + " Error de validación: revisa que los datos ingresados sean correctos.";
          } else if ((error as Error).message.includes("401")) {
              errorMessage = "No autorizado: verifica tu sesión.";
          } else if ((error as Error).message.includes("500")) {
              errorMessage = "Error interno del servidor. Inténtalo más tarde.";
            }
          return { success: false, error: errorMessage };
      }
}