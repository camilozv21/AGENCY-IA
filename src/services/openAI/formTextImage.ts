"use server";

import { FormTextImage } from "@/types/formTextImage.type";
import { httpService } from "../common/http.service";

export async function formTextImage({ prompt }: { prompt: string }): Promise<FormTextImage> {
  return await httpService.post<FormTextImage>("/openai-text-image/form-text-image", { prompt });
}