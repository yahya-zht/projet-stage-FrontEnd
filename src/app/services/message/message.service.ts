import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}
  private successMessage: string = '';

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }

  getSuccessMessage(): string {
    return this.successMessage;
  }
}
