import { DialogButton } from './dialog-button.model';

export class MessageDialog {
    public title: string;
    public subtitle: string;
    public message: string;
    public buttons: DialogButton[];
    public centered: boolean;
    public icon: string;
    public messageTexts: string[];
    public img: string;
    public imgCentered: boolean;
    public btnCentered: boolean;
    public iconIsHuge: boolean;

    constructor(title: string, subtitle: string, message: string, buttons: DialogButton[] = [], centered = false, icon = '', img = '', imgCentered = false, btnCentered = false, iconIsHuge = false) {
        this.title = title;
        this.subtitle = subtitle;
        this.message = message;
        this.buttons = buttons;
        this.centered = centered;
        this.icon = icon;
        this.messageTexts = message ? message.split('<br>') : [];
        this.img = img;
        this.imgCentered = imgCentered;
        this.btnCentered = btnCentered;
        this.iconIsHuge = iconIsHuge;
    }
}
