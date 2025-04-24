"use server";

import { httpService } from "../common/http.service";
import { GeneratePromptTextImage } from "@/types/generatePromptTextImage.type";

export async function generatePromptTextImage({ prompt }: { prompt: string }): Promise<GeneratePromptTextImage> {
  return await httpService.post<GeneratePromptTextImage>("/openai-text-image/generate-prompt-text-image", { prompt });
}