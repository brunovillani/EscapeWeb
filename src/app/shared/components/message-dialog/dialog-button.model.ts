export class DialogButton {
    public name: string;
    public action;
    public type: string;
    public icon: string;

    constructor(name: string, action, type: string = 'default', icon: string = '') {
        this.name = name;
        this.action = action;
        this.type = type;
        this.icon = icon;
    }
}
