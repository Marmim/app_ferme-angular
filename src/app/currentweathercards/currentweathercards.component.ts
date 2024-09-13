import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-currentweathercards',
  templateUrl: './currentweathercards.component.html',
  styleUrls: ['./currentweathercards.component.scss']
})
export class CurrentweathercardsComponent {
  @Input() temp!: string;
  @Input() target!: string;
  @Input() weather!: string;
  @Input() video!: string;

}
