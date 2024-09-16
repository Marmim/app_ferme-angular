import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-currentweathercards',
  templateUrl: './currentweathercards.component.html',
  styleUrls: ['./currentweathercards.component.scss']
})
export class CurrentweathercardsComponent {
  @Input({transform: numberAttribute}) temperature: number | undefined;
  @Input({transform: numberAttribute}) relativeHumidity: number | undefined;
  @Input({transform: numberAttribute}) windSpeed: number | undefined;
  @Input({transform: numberAttribute}) precipitation: number | undefined;

}
