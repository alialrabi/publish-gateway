import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommunicationmethod } from 'app/shared/model/core/communicationmethod.model';
import { CommunicationmethodService } from './communicationmethod.service';

@Component({
  selector: 'jhi-communicationmethod-delete-dialog',
  templateUrl: './communicationmethod-delete-dialog.component.html'
})
export class CommunicationmethodDeleteDialogComponent {
  communicationmethod: ICommunicationmethod;

  constructor(
    protected communicationmethodService: CommunicationmethodService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.communicationmethodService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'communicationmethodListModification',
        content: 'Deleted an communicationmethod'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-communicationmethod-delete-popup',
  template: ''
})
export class CommunicationmethodDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ communicationmethod }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CommunicationmethodDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.communicationmethod = communicationmethod;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/communicationmethod', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/communicationmethod', { outlets: { popup: null } }]);
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
