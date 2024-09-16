import { Component, Input, OnChanges } from '@angular/core';
import { Chart , ChartData, ChartDataset, ChartOptions } from 'chart.js';

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
    return [...Array(24).keys()].map(i => `${i}h`);
  }

  private datasets(): ChartDataset<'line', (number | null)[]>[] {
    const variable = this.variables.find(v => v.variable === this.selected);
    const dataValues = this.hourlyData[this.selected] ?? [];
    console.log(dataValues)
    return [
      {
        label: variable?.label,
        backgroundColor: variable?.color,
        borderColor: variable?.color,
        pointBackgroundColor: variable?.color,
        data: dataValues,
        tension: 0.5,
        type:"line"
      },
    ];
  }

  protected options(): ChartOptions<'line'> | undefined {
    const variable = this.variables.find(v => v.variable === this.selected);
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
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  }
}
