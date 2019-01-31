import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../utils/helper';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, type: string = null, digits: number = 2, prefix: string = '$'): any {
    let output = '';
    switch (type) {
      case 'M': {
        output = Helper.format.million(value, prefix, digits);
        break;
      }
      case 'k':
      case 'K': {
        output = Helper.format.thousands(value, prefix, digits);
        break;
      }
      default: {
        output = prefix + Helper.format.number(value, digits);
        break;
      }
    }
    return output;
  }
}
