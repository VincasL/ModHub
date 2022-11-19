import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastEvent } from '../toast-event';
import { EventTypes } from '../event-types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  /**
   * Show success toast notification.
   * @param message Toast message
   */
  showSuccessToast(message: string) {
    this._toastEvents.next({
      message,
      title: '',
      type: EventTypes.Success,
    });
  }

  /**
   * Show info toast notification.
   * @param message Toast message
   */
  showInfoToast(message: string) {
    this._toastEvents.next({
      message,
      title: '',
      type: EventTypes.Info,
    });
  }

  /**
   * Show warning toast notification.
   * @param message Toast message
   */
  showWarningToast(message: string) {
    this._toastEvents.next({
      message,
      title: '',
      type: EventTypes.Warning,
    });
  }

  /**
   * Show error toast notification.
   * @param message Toast message
   */
  showErrorToast(message: string) {
    this._toastEvents.next({
      message,
      title: '',
      type: EventTypes.Error,
    });
  }
}
