import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { flyInOut } from '../../animations';
import { Filter } from './models/filter.model';
import { PeriodFilter } from './models/period-filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [flyInOut]
})
export class FilterComponent implements OnChanges {
  @Input() filter: Filter = new Filter();
  @Input() opened = true;
  @Input() column = false;
  @Input() useCleanFilter = true;
  @Input() justified = false;
  @Output() filterUpdated = new EventEmitter();
  filtersForm: FormArray;

  constructor() { }

  ngOnChanges() {
    if (this.filter) {
      this.getForm();
    }
  }

  getForm() {
    const filtersForm = new FormArray([]);

    this.filter.fields.forEach(filter => {
      let filterForm;
      switch (filter.type) {
        case 'period':
          filterForm = this.getPeriodFilterForm(filter);
          break;
        case 'checkbox':
          filterForm = this.getCheckboxFilterForm(filter);
          break;
        default:
          filterForm = this.getDefaultFilterForm(filter);
          filterForm.get('value').valueChanges.subscribe(() => this.getValue());
          break;
      }
      (<FormArray>filtersForm).controls.push(filterForm);
    });

    this.filtersForm = filtersForm;
  }

  getDefaultFilterForm(filter) {
    const filterForm = new FormGroup({
      type: new FormControl(filter.type),
      key: new FormControl(filter.key),
      value: new FormControl({ value: filter.value, disabled: filter.disabled})
    });

    return filterForm;
  }

  getCheckboxFilterForm(filter) {
    const filterForm = new FormGroup({
      type: new FormControl(filter.type),
      key: new FormControl(filter.key),
      value: new FormArray([])
    });


    filter.options.forEach(option => {
      const newOptionForm = new FormGroup({
        key: new FormControl(option.type),
        text: new FormControl(option.text),
        value: new FormControl(option.value)
      });

      (<FormArray>filterForm.get('value')).push(newOptionForm);
    });

    return filterForm;
  }

  getPeriodFilterForm(filter: PeriodFilter) {
    const filterForm = new FormGroup({
      type: new FormControl(filter.type),
      key: new FormControl(filter.key),
      startDate: this.getDefaultFilterForm(filter.startDate),
      endDate: this.getDefaultFilterForm(filter.endDate)
    });

    return filterForm;
  }

  getValue() {
    const filters = this.filtersForm.getRawValue();
    const mappedFilters = filters.reduce((filtersValues, filter) => {
      switch (filter.type) {
        case 'period':
          filtersValues[filter.key] = {
            [filter.startDate.key]: filter.startDate.value,
            [filter.endDate.key]: filter.endDate.value
          };
          break;
        case 'checkbox':
          filter.value.forEach(option => {
            filtersValues[filter.key + option.key.charAt(0).toUpperCase() + option.key.slice(1)] = option.value;
          });
          break;
        default:
          filtersValues[filter.key] = filter.value;
          break;
      }
      return filtersValues;
    }, {});

    this.filterUpdated.emit(mappedFilters);
  }

  periodChange(fieldIndex: number, newDate: Date, startDate = true) {
    const field = this.filter.fields[fieldIndex];
    const filterValue = (<FormGroup>this.filtersForm.at(fieldIndex)).getRawValue();

    if (startDate) {
      field.minDate = newDate;
    } else {
      field.maxDate = newDate;
    }

    if (field.minDate && filterValue.startDate.value && filterValue.startDate.value.getTime() < field.minDate.getTime()) {
      this.filtersForm.at(fieldIndex).get('startDate.value').setValue(field.minDate);
    }

    if (field.maxDate && filterValue.endDate.value && filterValue.endDate.value.getTime() > field.maxDate.getTime()) {
      this.filtersForm.at(fieldIndex).get('endDate.value').setValue(field.maxDate);
    }

    this.getValue();
  }

  clearAll() {
    (<FormArray>this.filtersForm).controls.forEach(control => {
      switch (control.value.type) {
        case 'checkbox':
          (<FormArray>control.get('value')).controls.forEach(valueControl => this.clearValue(valueControl));
          break;
        default:
          this.clearValue(control);
          break;
      }
    });
  }

  clearValue(control) {
    const valueControl = control.get('value');
    if (valueControl) {
      valueControl.setValue(null);
    }
  }
}
