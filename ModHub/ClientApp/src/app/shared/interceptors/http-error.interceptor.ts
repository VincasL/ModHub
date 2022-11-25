import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../modules/toaster/services/toast.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly toastService: ToastService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          if (error.status.toString().startsWith('4'))
            errorMsg = `${error.status} Client Error, Message: ${error.message}`;
          else if (error.status.toString().startsWith('5'))
            errorMsg = `${error.status} Server Error, Message: ${error.message}`;
          else
            errorMsg = `${error.status} Unknown Error, Message: ${error.message}`;

          this.toastService.showErrorToast(errorMsg);
        }
        return throwError(errorMsg);
      })
    );
  }
}
