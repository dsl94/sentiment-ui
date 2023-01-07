import {Component, Input, OnInit} from '@angular/core';
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit{
  @Input()
  data: any
  @Input()
  max: number = 20
  options: EChartsOption = {

  }

  ngOnInit(): void {
    this.options = {
      title: {
        text: 'Comparison'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Vader', 'Pattern', 'Text Blob']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Very Positive', max: this.max },
          { name: 'Positive', max: this.max },
          { name: 'Neutral', max: this.max },
          { name: 'Negative', max: this.max },
          { name: 'Very Negative', max: this.max }
        ]
      },
      series: [
        {
          name: 'Text Blob vs Pattern vs Vader',
          type: 'radar',
          data: this.data
        }
      ]
    };
  }


}
