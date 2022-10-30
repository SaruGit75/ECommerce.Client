import { Injectable } from '@angular/core';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }
  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>) {
    this.toastr[toastrOptions.messageType](
      message,
      title,
      {
        positionClass: toastrOptions.position
      }
    )
  }
}

export class ToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition;

}

export enum ToastrMessageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum ToastrPosition {
  TopRight = "toast-top-right",
  TopLeft = "toast-top-left",
  TopCenter = "toast-top-center",
  BottomLeft = "toast-bottom-left",
  TopFullWidth = "toast-top-full-width"
}
