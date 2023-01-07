import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyzerService} from "../../services/analyzer.service";
import {AnalyzerResponse} from "../../dto/analyzer-response.dto";
import {NgxSpinnerService} from "ngx-spinner";
import {Subject} from "rxjs";
import {SentimentPerLibrary} from "../../dto/sentiment-per-library.dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  form: any = {
    query: null,
    max_results: 100
  }

  dataForPie = {vader: [], pattern: [], textBlob: [], general: []}
  dataForRadar = [];

  analyzerResponse!: AnalyzerResponse | undefined;
  dtOptions: DataTables.Settings = {};

  constructor(private analyzerService: AnalyzerService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.spinner.show();
    this.analyzerResponse = undefined;
    this.analyzerService.analyze(this.form.query, this.form.max_results).subscribe(result => {
      this.analyzerResponse = result;
      // @ts-ignore
      this.dataForPie = this.prepareDataForPie(this.analyzerResponse.sentiment_per_library);
      // @ts-ignore
      this.dataForRadar = this.prepareDataForRadar(this.analyzerResponse.sentiment_per_library);
      this.spinner.hide();
    })
  }

  getColor(sentiment: string) {
    if (sentiment.includes("Very positive")) {
      return "bg-success";
    } else if (sentiment.includes("Positive")) {
      return "bg-primary";
    } else if (sentiment.includes("Neutral")) {
      return "bg-secondary";
    } else if (sentiment.includes("Very negative")) {
      return "bg-danger";
    } else {
      return "bg-warning";
    }
  }
  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }

  prepareDataForPie(data: SentimentPerLibrary) {
    return {
      'vader': [
        {value: data.vader_very_positive, name: 'Very Positive'},
        {value: data.vader_positive, name: 'Positive'},
        {value: data.vader_neutral, name: 'Neutral'},
        {value: data.vader_very_negative, name: 'Very Negative'},
        {value: data.vader_negative, name: 'Negative'},
      ],
      'pattern': [
        {value: data.pattern_very_positive, name: 'Very Positive'},
        {value: data.pattern_positive, name: 'Positive'},
        {value: data.pattern_neutral, name: 'Neutral'},
        {value: data.pattern_very_negative, name: 'Very Negative'},
        {value: data.pattern_negative, name: 'Negative'},
      ],
      'textBlob': [
        {value: data.text_blob_very_positive, name: 'Very Positive'},
        {value: data.text_blob_positive, name: 'Positive'},
        {value: data.text_blob_neutral, name: 'Neutral'},
        {value: data.text_blob_very_negative, name: 'Very Negative'},
        {value: data.text_blob_negative, name: 'Negative'},
      ],
      'general': [
        {value: data.text_blob_very_positive + data.vader_very_positive + data.pattern_very_positive, name: 'Very Positive'},
        {value: data.text_blob_positive + data.vader_positive + data.pattern_positive, name: 'Positive'},
        {value: data.text_blob_neutral + data.vader_neutral + data.pattern_neutral, name: 'Neutral'},
        {value: data.text_blob_very_negative + data.vader_very_negative + data.pattern_very_negative, name: 'Very Negative'},
        {value: data.text_blob_negative + data.vader_negative + data.pattern_negative, name: 'Negative'},
      ]
    }
  }

  prepareDataForRadar(data: SentimentPerLibrary) {
    return [
      {name: 'Vader', value: [data.vader_very_positive, data.vader_positive, data.vader_neutral, data.vader_negative, data.vader_very_negative]},
      {name: 'Pattern', value: [data.pattern_very_positive, data.pattern_positive, data.pattern_neutral, data.pattern_negative, data.pattern_very_negative]},
      {name: 'Text Blob', value: [data.text_blob_very_positive, data.text_blob_positive, data.text_blob_neutral, data.text_blob_negative, data.text_blob_very_negative]},
    ]
  }
}
