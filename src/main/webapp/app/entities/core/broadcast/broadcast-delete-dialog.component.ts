import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBroadcast } from 'app/shared/model/core/broadcast.model';
import { BroadcastService } from './broadcast.service';

@Component({
  selector: 'jhi-broadcast-delete-dialog',
  templateUrl: './broadcast-delete-dialog.component.html'
})
export class BroadcastDeleteDialogComponent {
  broadcast: IBroadcast;

  constructor(protected broadcastService: BroadcastService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.broadcastService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'broadcastListModification',
        content: 'Deleted an broadcast'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-broadcast-delete-popup',
  template: ''
})
export class BroadcastDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ broadcast }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BroadcastDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.broadcast = broadcast;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/broadcast', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/broadcast', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
