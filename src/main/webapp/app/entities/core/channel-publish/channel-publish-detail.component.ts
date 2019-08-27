import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChannelPublish } from 'app/shared/model/core/channel-publish.model';

@Component({
  selector: 'jhi-channel-publish-detail',
  templateUrl: './channel-publish-detail.component.html'
})
export class ChannelPublishDetailComponent implements OnInit {
  channel: IChannelPublish;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ channel }) => {
      this.channel = channel;
    });
  }

  previousState() {
    window.history.back();
  }
}
