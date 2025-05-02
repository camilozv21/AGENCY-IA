"use server";

import { AWSVideoGenerated } from "@/types/generateVideoFromPrompt.type";
import { httpService } from "../common/http.service";

export async function createImageFromForm({ prompt }: { prompt: string }): Promise<AWSVideoGenerated> {
  return await httpService.post<AWSVideoGenerated>("/aws-text-video/generate-video-from-prompt", { prompt });
}