import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import {data} from "@maptiler/sdk";

interface HourlyChart {
  temperature: number[] | undefined;
  relativeHumidity: number[] | undefined;
}

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnChanges {
  @Input() hourlyData!: HourlyChart;
  //protected data: ChartData<'line'> | undefined;

  private labels() {
    return [...Array(24).keys()].map(i => `${i}h`);
  }

  protected selected = 'temperature';


  protected variables = [
    {
      variable: 0,
      label: 'Température',
      color: '#ec4899',
      unit: '°',
    },
      {
    variable: 1,
    label: 'Humidité',
    color: '#0ea5e9',
    unit: '%',
  }];

  protected data: any | undefined = {
    labels: this.labels(),
    datasets: [{
      label: this.variables[0]?.label,
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: this.variables[0]?.color,
      borderColor: this.variables[0]?.color,
      pointBackgroundColor: this.variables[0]?.color,
      tension: 0.5
    }]
  };

  public config : any | undefined = {
    data: this.data,
    type : "line"
  }

  chart: any;


  ngOnChanges(): void {
    console.log("ngOnChanges")
    this.chart  = new Chart("chart",this.config);
  }

  protected onSelect() {
    console.log(this.variables[this.selected])
    /*this.data = {
      labels: this.labels(),
      datasets: this.datasets(),
    };*/
  }

}
