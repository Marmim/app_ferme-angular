import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-weathercards',
  templateUrl: './weathercards.component.html',
  styleUrls: ['./weathercards.component.scss']
})
export class WeathercardsComponent {
  @Input({transform: numberAttribute}) temperature: number | undefined;
  @Input({transform: numberAttribute}) relativeHumidity: number | undefined;
  @Input({transform: numberAttribute}) windSpeed: number | undefined;
  @Input({transform: numberAttribute}) precipitation: number | undefined;

}
