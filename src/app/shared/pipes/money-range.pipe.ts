import { Helper } from './../../utils/helper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyRange'
})
export class MoneyRangePipe implements PipeTransform {

  transform(values: number[], digits: number = 1): any {
    let output = '';
    if (values.length > 2) {
      return '';
    }
    values.sort((a, b) => a - b);
    if ( values[0] === values[1] ) {
      output += Helper.format.number(values[0], digits, true, true);
      output = output.replace(',0', '');
      return output;
    }
    const si = [
      { value: 1, symbol: '' },
      { value: 1E3, symbol: ' mil' },
      { value: 1E6, symbol: ' MM' },
      { value: 1E9, symbol: ' B' }
    ];
    let i;

    for (i = si.length - 1; i > 0; i--) {
      if (values[1] >= si[i].value) {
        values[1] /= si[i].value;
        values[0] /= si[i].value;
        break;
      }
    }

    values.forEach( v => {
      let stringAux: string;
      if (v !== values[values.length - 1]) {
        stringAux = Helper.format.number(v, digits, false, true);
        output += stringAux.replace(',0', '');
        output += ' - ';
      } else {
        stringAux = Helper.format.number(v, digits, false, false);
        output += stringAux.replace(',0', '');
      }
    });

    output += ' ' + si[i].symbol;

    return output;
  }

}
