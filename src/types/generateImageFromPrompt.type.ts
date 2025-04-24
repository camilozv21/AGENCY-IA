export interface GenerateImageFromPrompt {
  created: number;
  data:    Datum[];
}

export interface Datum {
  revised_prompt: string;
  url:            string;
}
