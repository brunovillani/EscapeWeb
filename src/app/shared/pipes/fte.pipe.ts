import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../utils/helper';

@Pipe({
  name: 'fte'
})
export class FTEPipe implements PipeTransform {

  transform(value: number, digits: number = 2): any {
    if (isNaN(value)) {
      return '';
    }

    return Helper.format.number(value, digits) + ' HC';
  }
}
