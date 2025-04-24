"use server";

import { httpService } from "../common/http.service";
import { GenerateImageFromPrompt } from "@/types/generateImageFromPrompt.type";

export async function generateImageFromPrompt({ prompt }: { prompt: string }): Promise<GenerateImageFromPrompt> {
  return await httpService.post<GenerateImageFromPrompt>("/openai-text-image/generate-image-from-prompt", { prompt });
}