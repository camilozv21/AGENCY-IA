export interface Login {
  message:   string;
  session:   string;
  tokenInfo: TokenInfo;
  email:     string;
  error?:    string;
}

export interface TokenInfo {
  tokensQuantity: number;
  tokensExpDate:  Date;
}
