import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartData,
  ChartDataset,
  ChartOptions,
  ScatterDataPoint,
} from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { FormsModule } from '@angular/forms';

interface HourlyChart {
  temperature: number[];
  relativeHumidity: number[];
}

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnChanges{
  @Input() hourlyData!: HourlyChart;
  protected data: ChartData | undefined;
  protected selected = 'temperature';

  protected variables = [
    {
      variable: 'temperature',
      label: 'Température',
      color: '#ec4899',
      unit: '°',
    },
    {
      variable: 'relativeHumidity',
      label: 'Humidité',
      color: '#0ea5e9',
      unit: '%',
    },
  ];
  @Input() temperature!: number[] | undefined;

  ngOnChanges(): void {
    this.data = {
      labels: this.labels(),
      datasets: this.datasets(),
    };
  }

  protected onSelect() {
    this.data = {
      labels: this.labels(),
      datasets: this.datasets(),
    };
  }

  private labels() {
    return [...Array(24).keys()].map((i) => `${i}h`);
  }

  private datasets(): ChartDataset<
    'line',
    (number | ScatterDataPoint | null)[]
  >[] {
    const variable = this.variables.find((v) => v.variable === this.selected);
    console.log(this.data)
    return [
      {
        label: variable?.label,
        backgroundColor: variable?.color,
        borderColor: variable?.color,
        pointBackgroundColor: variable?.color,
        data: this.hourlyData[this.selected],
        tension: 0.5,
      },
    ];
  }

  protected options(): ChartOptions<'line'> | undefined {
    const variable = this.variables.find((v) => v.variable === this.selected);

    return {
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              size: 14,
              family: 'Nunito, sans-serif',
            },
            padding: 28,
          },
          position: 'bottom',
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => {
              const unit = variable?.unit ?? '';
              return `${Math.round(Number(value))}${unit}`;
            },
          },
        },
        xAxes: {
          grid: {
            display: false,
          },
        },
      },
    };
  }


}
