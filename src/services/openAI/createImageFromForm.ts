"use server";

import { httpService } from "../common/http.service";
import { CreateImageFromForm } from "@/types/createImageFromForm.type";

export async function createImageFromForm({ prompt }: { prompt: string }): Promise<CreateImageFromForm> {
  return await httpService.post<CreateImageFromForm>("/openai-text-image/create-image-from-form", { prompt });
}