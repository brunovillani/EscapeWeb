export class InputFilter {
    key: string;
    placeholder: string;
    value: any;
    type = 'input';
    disabled: boolean;

    constructor(key: string, placeholder: string, value: any = null, disabled: boolean = false) {
        this.key = key;
        this.placeholder = placeholder;
        this.value = value;
        this.disabled = disabled;
    }
}
