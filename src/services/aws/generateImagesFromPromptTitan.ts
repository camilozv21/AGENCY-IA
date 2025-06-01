import { AWSImageGeneratedTitan } from "@/types/generateImagesFromPromptTitan.type";
import { httpService } from "../common/http.service";
import { ImageSettings } from "@/app/api/(AWS)/aws-text-image-titan/generate-image-from-prompt-titan/route";

export async function generateImagesFromPromptTitan({ imageSettings }: { imageSettings: ImageSettings}): Promise<{ success: boolean; data?: AWSImageGeneratedTitan; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<AWSImageGeneratedTitan>("/aws-text-image-titan/generate-image-from-prompt-titan", { ...imageSettings },{credentials:"include"});
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