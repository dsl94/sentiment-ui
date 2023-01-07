import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyzerService} from "../../services/analyzer.service";
import {AnalyzerResponse} from "../../dto/analyzer-response.dto";
import {NgxSpinnerService} from "ngx-spinner";
import {Subject} from "rxjs";

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

  analyzerResponse!: AnalyzerResponse;
  dtOptions: DataTables.Settings = {};

  constructor(private analyzerService: AnalyzerService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.spinner.show();
    this.analyzerService.analyze(this.form.query, this.form.max_results).subscribe(result => {
      this.analyzerResponse = result;
      this.spinner.hide();
    })
  }

  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }
}
