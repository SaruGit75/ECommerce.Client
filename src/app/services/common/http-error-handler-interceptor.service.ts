import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: CustomToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You're Unauthorized! ", "Unauthorized", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Server is not accessible! ", "Server Error!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Requested invalid process!", "Invalid Request!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Not Found Page!", "Not Found!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          });
          break;
        default:
          this.toastrService.message("An Unexpected error occured!", "Unexpected Error!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          });
          break;
      }

      return of(error);
    }));

  }

}
