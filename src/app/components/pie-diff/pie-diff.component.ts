import {Component, Input, OnInit} from '@angular/core';
import {ThemeOption} from "ngx-echarts";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-pie-diff',
  templateUrl: './pie-diff.component.html',
  styleUrls: ['./pie-diff.component.scss']
})
export class PieDiffComponent implements OnInit{
  @Input()
  data: any;
  options: EChartsOption = {}
  colorPalette = ['#198754', '#0DCAF0', '#6C757D', '#DC3545', '#FFC107']

  ngOnInit(): void {
    this.options = {
      title: {
        left: '50%',
        text: 'Total sum of sentiments',
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
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.data,
          color: this.colorPalette
        }
      ]
    }
  }

}
