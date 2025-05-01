
export function applyStyleToPrompt(basePrompt: string, style: string): string {
    switch (style.toLowerCase()) {
      case "realistic":
        return `a realistic photo of ${basePrompt}`;
      case "hyperrealistic":
        return `a hyperrealistic ultra-detailed photo of ${basePrompt}`;
      case "photographic":
        return `a professional photographic image of ${basePrompt}`;
      case "cinematic":
        return `a cinematic shot of ${basePrompt}`;
      case "film noir":
        return `a film noir scene of ${basePrompt}`;
      case "fantasy":
        return `a fantasy illustration of ${basePrompt}`;
      case "dark fantasy":
        return `a dark fantasy concept art of ${basePrompt}`;
      case "anime":
        return `an anime-style illustration of ${basePrompt}`;
      case "manga":
        return `a manga-style drawing of ${basePrompt}`;
      case "cartoon":
        return `a cartoon drawing of ${basePrompt}`;
      case "digital painting":
        return `a digital painting of ${basePrompt}`;
      case "watercolor":
        return `a watercolor painting of ${basePrompt}`;
      case "oil painting":
        return `an oil painting of ${basePrompt}`;
      case "pixel art":
        return `a pixel art image of ${basePrompt}`;
      case "cyberpunk":
        return `a cyberpunk-style futuristic image of ${basePrompt}`;
      case "steampunk":
        return `a steampunk-themed illustration of ${basePrompt}`;
      case "vaporwave":
        return `a vaporwave style aesthetic of ${basePrompt}`;
      case "retro":
        return `a retro 80s style image of ${basePrompt}`;
      case "minimalist":
        return `a minimalist clean design of ${basePrompt}`;
      case "surreal":
        return `a surreal art depiction of ${basePrompt}`;
      case "abstract":
        return `an abstract conceptual artwork of ${basePrompt}`;
      case "sketch":
        return `a pencil sketch drawing of ${basePrompt}`;
      case "noir":
        return `a noir-style dramatic scene of ${basePrompt}`;
      case "gothic":
        return `a gothic dark-style illustration of ${basePrompt}`;
      case "baroque":
        return `a baroque-style classical painting of ${basePrompt}`;
      case "futuristic":
        return `a futuristic sci-fi rendering of ${basePrompt}`;
      case "3d render":
        return `a highly detailed 3D render of ${basePrompt}`;
      case "claymation":
        return `a claymation-style scene of ${basePrompt}`;
      case "papercut":
        return `a paper cut-out illustration of ${basePrompt}`;
      default:
        return basePrompt; // Si no coincide, devolver el prompt original
    }
  }
  