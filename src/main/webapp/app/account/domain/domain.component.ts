import { Component, OnInit } from '@angular/core';
import { Domain } from './domain';
import { DomainService } from './domain.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  currentSearch: string;
  domains: Domain[] = [];
  constructor(private domainService: DomainService, protected jhiAlertService: JhiAlertService) {}

  loadAll() {
    this.domainService.getAllDomain().subscribe(
      (res: HttpResponse<Domain[]>) => {
        this.domains = res.body;
        console.log(res.body);
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
    );
  }

  ngOnInit() {
    this.loadAll();
  }

  trackId(index: number, item: Domain) {
    return item.id;
  }

  search(query) {
    console.log(query);
  }
  clear() {}
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
