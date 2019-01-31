import { InputFilter } from './input-filter.model';
import { Main } from 'src/app/models/main';

export class SelectFilter extends InputFilter {
    options: Main.TextValue[];
    multiple: boolean;

    constructor(key: string, placeholder: string,  options: Main.TextValue[], multiple = false, values: any[] | any = null) {
        super(key, placeholder, values);
        this.options = options;
        this.multiple = multiple;
        this.type = 'select';
    }
}
