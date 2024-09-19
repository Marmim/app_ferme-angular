import {Pipe, PipeTransform} from "@angular/core";
import {Culture} from "../models/farm.model";

@Pipe({
  name: 'cropconcat',
  standalone: true,
})
export class CropConcatPipePipe implements PipeTransform {
    transform(value: Culture[]) {
      return value.map(c => c.nom).join(',');
    }
}
