import { Component, Input, OnChanges } from '@angular/core';
import { ChartjsComponent  } from '@coreui/angular-chartjs';

interface HourlyChart {
  temperature: number[] | undefined;
  relativeHumidity: number[] | undefined;
}

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],

})
export class WeatherChartComponent implements OnChanges {
  @Input() hourlyData!: HourlyChart;
  @Input() selectedDayIndex!: number;
  //protected data: ChartData<'line'> | undefined;
  protected data: any | undefined;

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
    console.log(this.data?.datasets)
  }

  private labels() {
    return [...Array(24).keys()].map(i => `${i}h`);
  }

  private datasets(): any {
    const variable = this.variables.find(v => v.variable === this.selected);
    //console.log(variable)
    const dataValues = this.hourlyData[this.selected] ?? [];
    //console.log(dataValues.slice(0,24))
    return [
      {
        label: variable?.label,
        backgroundColor: variable?.color,
        borderColor: variable?.color,
        pointBackgroundColor: variable?.color,
        data: dataValues.slice(this.selectedDayIndex * 24, this.selectedDayIndex * 24 + 24),
        tension: 0.5
      },
    ];
  }

  protected options(): any | undefined {
    const variable = this.variables.find(v => v.variable === this.selected);
    return {
      plugins: {
        legend: {
          display: true,
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
            display: true,
          },
        },
      },
    };
  }
}
