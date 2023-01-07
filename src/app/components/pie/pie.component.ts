import {Component, Input, OnInit} from '@angular/core';
import {EChartsOption} from "echarts";
import {ThemeOption} from "ngx-echarts";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  title: string = '';
  theme: string | ThemeOption = '';
  options: EChartsOption = {}
  colorPalette = ['#198754', '#0DCAF0', '#6C757D', '#DC3545', '#FFC107']

  ngOnInit(): void {
    this.options = {
      title: {
        left: '50%',
        text: this.title,
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        align: 'auto',
        bottom: 10,
        data: ['Very Positive', 'Positive', 'Neutral', 'Very Negative', 'Negative']
      },
      calculable: true,
      series: [
        {
          name: 'Sentiment',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: this.data,
          color: this.colorPalette
        }
      ]
    }
  }

}
