
import { auth } from "@/auth"; // Este viene de NextAuth v5 setup
import { validateTokens } from "@/helpers/validateTokens";
import { generateImagesFromPromptCanva } from "@/services/aws/generateImageFromPromptCanva";
import { generetePromptTextImage } from "@/services/aws/generetePromptTextImage";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

interface RequestBody {
  prompt: string;
  settings: Settings;
}

export interface Settings {
  style: string;
  aspectRatio: string;
  lighting: string;
  camera: string;
  numberOfImages: number;
}

export const POST = auth(async (request: NextAuthRequest) => {
  const session = request.auth;

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

//   const isTokenValid = await validateTokens(session.user.email || "", 100);
//   if (!isTokenValid) {
//     return new NextResponse("Not enough tokens", { status: 403 });
//   }

  try {
    const body: RequestBody = await request.json();
    const { prompt, settings } = body;

    const isValidTokens = await validateTokens(session.user.email || "", settings.numberOfImages*27);

    if (!isValidTokens) {
      return new NextResponse("Not enough tokens", { status: 403 });
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: '"Prompt" field is required and must be a string' },
        { status: 400 }
      );
    }

    const promptSettings = {
      prompt,
      settings: {
        lighting: settings.lighting,
        camera: settings.camera,
      },
    };

    const formTextImageFromPrompt = await generetePromptTextImage({
      promptSettings,
    });

    const imageSettings = {
      prompt: formTextImageFromPrompt.data?.result || "",
      settings: {
        style: settings.style,
        aspectRatio: settings.aspectRatio || "1:1",
        numberOfImages: settings.numberOfImages || 3,
      },
    };

    const generateImageFromPromptCanva = await generateImagesFromPromptCanva({
      imageSettings,
    });

    return NextResponse.json(generateImageFromPromptCanva, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Error interno", details: (error as Error).message },
      { status: 500 }
    );
  }
});