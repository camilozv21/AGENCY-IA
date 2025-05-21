export function applyselectPayload(typeTask: string = "OUTPAINTING", cleanBase64: string, prompt: string, styledPrompt: string, numberOfImages:number, height:number, width:number) {
    let payload;  
    switch (typeTask) {
      case 'OUTPAINTING':
        payload = {
          taskType : "OUTPAINTING",
          outPaintingParams: {
            image: cleanBase64,
            maskPrompt: prompt,
            outPaintingMode: "PRECISE",
            text: styledPrompt,
            negativeText:
              "blurry, distorted, low quality, low resolution, pixelated, artifacts, deformed, bad anatomy, extra limbs, missing limbs, poorly drawn, mutated, ugly, unrealistic, low detail, jpeg artifacts, bad lighting, overexposed, underexposed, unnatural colors, disfigured, text, watermark, logo, cropped, frame cut, tiling, out of frame"
          }, 
          imageGenerationConfig: {
            numberOfImages: numberOfImages || 3,
            quality: "premium",
            cfgScale: 7.5,
            seed: Math.floor(Math.random() * 1000)
          },
        };
        break;  
      case 'IMAGE_VARIATION':
        payload = {
        taskType : "IMAGE_VARIATION",          
          imageVariationParams: {
            images: [cleanBase64],
            similarityStrength: 0.8,
            text: styledPrompt,
            negativeText: "blurry, distorted, low quality, low resolution, pixelated, artifacts, deformed, bad anatomy, extra limbs, missing limbs, poorly drawn, mutated, ugly, unrealistic, low detail, jpeg artifacts, bad lighting, overexposed, underexposed, unnatural colors, disfigured, text, watermark, logo, cropped, frame cut, tiling, out of frame"
          },
          imageGenerationConfig: {
            quality: "premium",
            numberOfImages: numberOfImages || 3,
            height,
            width,
            cfgScale: 7.5,
            seed: Math.floor(Math.random() * 1000)
          },
        };
        break;
        case 'INPAINTING':
            payload = {
              taskType : "INPAINTING",          
              inPaintingParams: {
                image: cleanBase64,
                maskPrompt:prompt,
                text: styledPrompt,
                negativeText: "blurry, distorted, low quality, low resolution, pixelated, artifacts, deformed, bad anatomy, extra limbs, missing limbs, poorly drawn, mutated, ugly, unrealistic, low detail, jpeg artifacts, bad lighting, overexposed, underexposed, unnatural colors, disfigured, text, watermark, logo, cropped, frame cut, tiling, out of frame"
              },
              imageGenerationConfig: {
                quality: "premium",
                numberOfImages: numberOfImages || 3,
                cfgScale: 7.5,
                seed: Math.floor(Math.random() * 1000)
              },
            };
            break;
        case 'BACKGROUND_REMOVAL':
            payload = {
                taskType : "BACKGROUND_REMOVAL",          
                backgroundRemovalParams: {
                image: cleanBase64}
            };
            break;
      default:
        throw new Error(`Unknown task type: ${typeTask}`);
    }
  
    return payload;
  }
  