"use server";

import { Login } from "@/types/login.types";
import { httpService } from "../common/http.service";

export async function loginUser({ email, password }: { email: string; password: string }): Promise<{ success: boolean; data?: Login; error?: string }> {
    try {
        const response = await httpService.post<Login>("/auth/login", { email, password }, { credentials: "include" });
        return { success: true, data: response };
    } catch (error: unknown) {
        console.error("Error during login:", (error as Error).message);
        let errorMessage = "No se pudo iniciar sesión. Por favor verifica las credenciales o contacta soporte.";
        if ((error as Error).message.includes("400")) {
            errorMessage = "Credenciales inválidas.";
        } else if ((error as Error).message.includes("401")) {
            errorMessage = "Credenciales inválidas.";
        } else if ((error as Error).message.includes("500")) {
            errorMessage = "Error interno del servidor. Inténtalo más tarde.";
        }
        return { success: false, error: errorMessage };
    }
}
