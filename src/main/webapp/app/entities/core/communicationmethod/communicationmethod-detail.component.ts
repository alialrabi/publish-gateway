import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommunicationmethod } from 'app/shared/model/core/communicationmethod.model';

@Component({
  selector: 'jhi-communicationmethod-detail',
  templateUrl: './communicationmethod-detail.component.html'
})
export class CommunicationmethodDetailComponent implements OnInit {
  communicationmethod: ICommunicationmethod;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ communicationmethod }) => {
      this.communicationmethod = communicationmethod;
    });
  }

  previousState() {
    window.history.back();
  }
}
