export interface Createimagefromprompticloud {
    result:  Result;
    success: boolean;
    error? : string;
}

export interface Result {
    predictions: Prediction[];
}

export interface Prediction {
    mimeType:           string;
    bytesBase64Encoded: string;
}
