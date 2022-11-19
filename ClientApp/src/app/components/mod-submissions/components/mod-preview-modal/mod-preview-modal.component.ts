import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {Mod} from "../../../../services/rest/models";

@Component({
  selector: 'app-mod-preview-modal',
  templateUrl: './mod-preview-modal.component.html',
  styleUrls: ['./mod-preview-modal.component.css'],
})
export class ModPreviewModalComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<ModPreviewModalComponent>) {}
  mod!: Mod;

  ngOnInit(): void {}

  onClose(success: boolean = false) {
    this.modalRef.close({ success });
  }
}
