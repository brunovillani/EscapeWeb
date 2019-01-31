import { Helper } from './../../utils/helper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRange'
})
export class NumberRangePipe implements PipeTransform {

  transform(values: number[], digits: number = 1) {
    let output = '';

    values = values.filter(v => v != null);
    if (values.length > 2 || values.length === 0) {
      return output;
    }
    values.sort((a, b) => a - b);
    if ( values[0] === values[1] || values.length === 1) {
      output += values[0].toFixed(digits).toString();
    } else {
      output += values[0].toFixed(digits).toString();
      output += ' - ';
      output += values[1].toFixed(digits).toString();
    }
    output = output.split('.0').join('');
    return output.split('.').join(',');
  }
}
