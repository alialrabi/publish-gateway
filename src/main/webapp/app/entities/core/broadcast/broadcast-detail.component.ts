import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IBroadcast } from 'app/shared/model/core/broadcast.model';

@Component({
  selector: 'jhi-broadcast-detail',
  templateUrl: './broadcast-detail.component.html'
})
export class BroadcastDetailComponent implements OnInit {
  broadcast: IBroadcast;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ broadcast }) => {
      this.broadcast = broadcast;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
