import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnalyzerResponse} from "../dto/analyzer-response.dto";

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string
  ) {}

  analyze(query: string, max_results: number) {
    return this.http.post<AnalyzerResponse>(this.baseUrl + '/search', {query, max_results});
  }
}
