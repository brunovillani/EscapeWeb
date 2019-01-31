export class TextValue {
    text: string;
    value: any;
    type: any;

    constructor(text: string, value: any, type: any = null) {
        this.text = text;
        this.value = value;
        this.type = type;
    }
}
