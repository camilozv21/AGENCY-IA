export interface Dalle3 {
  created: number;
  data:    Datum[];
}

export interface Datum {
  revised_prompt: string;
  url:            string;
}
