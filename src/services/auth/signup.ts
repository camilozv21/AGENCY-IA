"use server";

import { SignUp } from "@/types/createNewUser";
import { httpService } from "../common/http.service";

export async function createNewUser({ email, password }: { email: string; password: string }): Promise<SignUp> {
  return await httpService.post<SignUp>("/singup", { email, password });
}