import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<ConfirmModalComponent>) {}
  title: string | null = null;
  text: string | null = null;
  isSuccess: boolean = true;
  cancelButtonText: string = 'Cancel';
  saveButtonText: string = this.isSuccess ? 'Save' : 'Delete';

  ngOnInit(): void {}

  onClose(success: boolean = false) {
    this.modalRef.close({ success });
  }
}
