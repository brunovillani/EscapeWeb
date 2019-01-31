import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) {

  }

  public showMessage(message: string, duration = 5000): void {
    if (typeof(message) !== 'string') {
      message = 'Ops... ocorreu um erro no sistema!';
    }
    this.snackBar.open(message, 'OK',  { duration });
  }
}
