export interface AnalyzedTweet {
  original: string;
  text_blob: string;
  text_blob_numeric: number;
  vader: string;
  vader_numeric: number;
  pattern: string;
  pattern_numeric: number;
}
