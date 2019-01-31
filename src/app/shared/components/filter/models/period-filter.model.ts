import { InputFilter } from './input-filter.model';

export class PeriodFilter {
  key: string;
  startDate: InputFilter;
  endDate: InputFilter;
  minDate: Date;
  maxDate: Date;
  type = 'period';

  constructor(
    key: string,
    startDate: InputFilter,
    endDate: InputFilter,
    minDate: Date = null,
    maxDate: Date = null
  ) {
    this.key = key;
    this.startDate = startDate;
    this.startDate.type = 'period';
    this.endDate = endDate;
    this.endDate.type = 'period';
    this.minDate = minDate ? minDate : this.startDate.value;
    this.maxDate = maxDate ? maxDate : this.endDate.value;
  }
}
