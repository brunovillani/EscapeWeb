import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../utils/helper';

@Pipe({
  name: 'millions'
})
export class MillionsPipe implements PipeTransform {

  transform(value: number, prefix: string = '$ ', digits: number = 2): any {
    return Helper.format.million(value, prefix, digits);
  }

}
