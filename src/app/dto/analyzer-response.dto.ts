import {AnalyzedTweet} from "./analyzed-tweet.dto";
import {ResultsPerLibrary} from "./result-per-livrary.dto";
import {SentimentPerLibrary} from "./sentiment-per-library.dto";

export interface AnalyzerResponse {
  analyzed_tweets: AnalyzedTweet[];
  results_per_library: ResultsPerLibrary;
  sentiment_per_library: SentimentPerLibrary;
}
