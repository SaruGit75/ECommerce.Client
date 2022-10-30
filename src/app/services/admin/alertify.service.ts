import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  // message(message: string, messageType: MessageType, position: Position, delay: number = 3, dismissOthers: boolean = false) 
  message(message: string, options: Partial<AlertifyOptions>) {
    const msg = alertify[options.messageType](message);
    alertify.set('notifier', 'position', options.position);
    alertify.set('notifier', 'delay', options.delay);

    if (options.dismissOthers) {
      msg.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning'
}


export enum Position {
  TopRight = 'top-right',
  BottomRight = 'bottom-right',
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center'
}