export interface Gtp4Turbo {
  id:                   string;
  object:               string;
  created_at:           number;
  status:               string;
  error:                null;
  incomplete_details:   null;
  instructions:         null;
  max_output_tokens:    number;
  model:                string;
  output:               Output[];
  parallel_tool_calls:  boolean;
  previous_response_id: null;
  reasoning:            Reasoning;
  service_tier:         string;
  store:                boolean;
  temperature:          number;
  text:                 Text;
  tool_choice:          string;
  tools:                any[];
  top_p:                number;
  truncation:           string;
  usage:                Usage;
  user:                 null;
  metadata:             Metadata;
  output_text:          string;
}

export interface Metadata {
}

export interface Output {
  id:      string;
  type:    string;
  status:  string;
  content: Content[];
  role:    string;
}

export interface Content {
  type:        string;
  annotations: any[];
  text:        string;
}

export interface Reasoning {
  effort:  null;
  summary: null;
}

export interface Text {
  format: Format;
}

export interface Format {
  type: string;
}

export interface Usage {
  input_tokens:          number;
  input_tokens_details:  InputTokensDetails;
  output_tokens:         number;
  output_tokens_details: OutputTokensDetails;
  total_tokens:          number;
}

export interface InputTokensDetails {
  cached_tokens: number;
}

export interface OutputTokensDetails {
  reasoning_tokens: number;
}
