import {Component, OnInit} from '@angular/core';
import {AnalyzerService} from "../../services/analyzer.service";
import {AnalyzerResponse} from "../../dto/analyzer-response.dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: any = {
    query: null,
    max_results: 100
  }

  analyzerResponse!: AnalyzerResponse;

  constructor(private analyzerService: AnalyzerService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.analyzerService.analyze("Elon Musk", 10).subscribe(result => {
      this.analyzerResponse = result;
      console.log(this.analyzerResponse);
    })
  }
}
