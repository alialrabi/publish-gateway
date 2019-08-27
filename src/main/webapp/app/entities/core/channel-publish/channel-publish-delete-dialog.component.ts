import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChannelPublish } from 'app/shared/model/core/channel-publish.model';
import { ChannelPublishService } from './channel-publish.service';

@Component({
  selector: 'jhi-channel-publish-delete-dialog',
  templateUrl: './channel-publish-delete-dialog.component.html'
})
export class ChannelPublishDeleteDialogComponent {
  channel: IChannelPublish;

  constructor(
    protected channelService: ChannelPublishService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.channelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'channelListModification',
        content: 'Deleted an channel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-channel-publish-delete-popup',
  template: ''
})
export class ChannelPublishDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ channel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ChannelPublishDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.channel = channel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/channel-publish', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/channel-publish', { outlets: { popup: null } }]);
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
