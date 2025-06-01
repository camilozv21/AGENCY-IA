import { httpService } from "../common/http.service";
import { ImageSetting} from "@/app/api/(AWS)/aws-text-image-canva/generate-image-from-prompt-canva/route";
import { AWSImageGeneratedCanva } from "@/types/createImageFromPromptCanva.type";

export async function generateImagesFromPromptCanva({ imageSettings }: { imageSettings: ImageSetting}): Promise<{ success: boolean; data?: AWSImageGeneratedCanva; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<AWSImageGeneratedCanva>("/aws-text-image-canva/generate-image-from-prompt-canva", { ...imageSettings },{credentials:"include"});
          return { ...response, success: true };
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