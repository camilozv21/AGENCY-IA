"use server";


import { AWSPromptVideoGenerated } from "@/types/generetePromptTextVideo";
import { httpService } from "../common/http.service";

export async function createImageFromForm({ prompt }: { prompt: string }): Promise<AWSPromptVideoGenerated> {
  return await httpService.post<AWSPromptVideoGenerated>("/aws-text-video/generete-prompt-text-video", { prompt });
}