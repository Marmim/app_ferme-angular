import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-weathercards',
  templateUrl: './weathercards.component.html',
  styleUrls: ['./weathercards.component.scss']
})
export class WeathercardsComponent {
  @Input() title: string | undefined;
  @Input() value: number | undefined;
  @Input() unit: string | undefined;

}
