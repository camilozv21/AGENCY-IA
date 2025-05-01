"use server";

import { SignUp } from "@/types/createNewUser";
import { httpService } from "../common/http.service";

export async function createNewUser({ email, password }: { email: string; password: string }): Promise<{ success: boolean; data?: SignUp; error?: string }> {
    try {
        const response = await httpService.post<SignUp>("/auth/singup", { email, password });
        console.log(response);
        return { success: true, data: response };
    } catch (error: unknown) {
        console.error("Error during user sign up:", (error as Error).message);
        let errorMessage = "No se pudo crear el usuario. Por favor verifica los datos o contacta soporte.";
        if ((error as Error).message.includes("400")) {
            errorMessage = "Error de validación: revisa que los datos ingresados sean correctos.";
        } else if ((error as Error).message.includes("500")) {
            errorMessage = "Error interno del servidor. Inténtalo más tarde.";
        }
        return { success: false, error: errorMessage };
    }
}