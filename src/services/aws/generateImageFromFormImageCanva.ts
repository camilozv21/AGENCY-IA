import { httpService } from "../common/http.service";
import {Settings} from "@/app/api/(AWS)/aws-image-image-canva/generate-image-from-form-image-canva/route";
import { CreateImageFromFormImageCanva } from "@/types/createImageFromFormImageCanva.type";

export async function generateImagesFromFormImageCanva({ prompt,imageBase64,settings,typeTask }: { prompt: string ,imageBase64: string , settings: Settings , typeTask:string  }): Promise<{ success: boolean; data?: CreateImageFromFormImageCanva; error?: string }> {
    // const cookie = (await cookies()).get('authjs.session-token')?.value
    try {
          const response = await httpService.post<CreateImageFromFormImageCanva>("/aws-image-image-canva/generate-image-from-form-image-canva", {prompt,imageBase64,settings,typeTask},{credentials:"include"});
          if (response.success === false) {
            return { success: false, error: response.error || "No se pudo generar la imagen" };
          }
          return { success: true, data: response };
      } catch (error: unknown) {
          console.error("Error during image creation:", (error as Error).message);
          let errorMessage = "No se pudo generar la imagen. Por favor verifica los datos o contacta soporte.";
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