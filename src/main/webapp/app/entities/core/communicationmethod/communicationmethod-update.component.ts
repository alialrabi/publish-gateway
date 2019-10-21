import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICommunicationmethod, Communicationmethod } from 'app/shared/model/core/communicationmethod.model';
import { CommunicationmethodService } from './communicationmethod.service';
import { IContact } from 'app/shared/model/core/contact.model';
import { ContactService } from 'app/entities/core/contact';

@Component({
  selector: 'jhi-communicationmethod-update',
  templateUrl: './communicationmethod-update.component.html'
})
export class CommunicationmethodUpdateComponent implements OnInit {
  isSaving: boolean;

  contacts: IContact[];

  editForm = this.fb.group({
    id: [],
    valueString: [],
    countryCode: [],
    createdByUser: [],
    createdDateTime: [],
    updatedByUser: [],
    updatedDateTime: [],
    status: [],
    domain: [null, [Validators.required]],
    contact: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected communicationmethodService: CommunicationmethodService,
    protected contactService: ContactService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ communicationmethod }) => {
      this.updateForm(communicationmethod);
    });
    this.contactService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IContact[]>) => mayBeOk.ok),
        map((response: HttpResponse<IContact[]>) => response.body)
      )
      .subscribe((res: IContact[]) => (this.contacts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(communicationmethod: ICommunicationmethod) {
    this.editForm.patchValue({
      id: communicationmethod.id,
      valueString: communicationmethod.valueString,
      countryCode: communicationmethod.countryCode,
      createdByUser: communicationmethod.createdByUser,
      createdDateTime: communicationmethod.createdDateTime != null ? communicationmethod.createdDateTime.format(DATE_TIME_FORMAT) : null,
      updatedByUser: communicationmethod.updatedByUser,
      updatedDateTime: communicationmethod.updatedDateTime != null ? communicationmethod.updatedDateTime.format(DATE_TIME_FORMAT) : null,
      status: communicationmethod.status,
      domain: communicationmethod.domain,
      contact: communicationmethod.contact
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const communicationmethod = this.createFromForm();
    if (communicationmethod.id !== undefined) {
      this.subscribeToSaveResponse(this.communicationmethodService.update(communicationmethod));
    } else {
      this.subscribeToSaveResponse(this.communicationmethodService.create(communicationmethod));
    }
  }

  private createFromForm(): ICommunicationmethod {
    return {
      ...new Communicationmethod(),
      id: this.editForm.get(['id']).value,
      valueString: this.editForm.get(['valueString']).value,
      countryCode: this.editForm.get(['countryCode']).value,
      createdByUser: this.editForm.get(['createdByUser']).value,
      createdDateTime:
        this.editForm.get(['createdDateTime']).value != null
          ? moment(this.editForm.get(['createdDateTime']).value, DATE_TIME_FORMAT)
          : undefined,
      updatedByUser: this.editForm.get(['updatedByUser']).value,
      updatedDateTime:
        this.editForm.get(['updatedDateTime']).value != null
          ? moment(this.editForm.get(['updatedDateTime']).value, DATE_TIME_FORMAT)
          : undefined,
      status: this.editForm.get(['status']).value,
      domain: this.editForm.get(['domain']).value,
      contact: this.editForm.get(['contact']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunicationmethod>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackContactById(index: number, item: IContact) {
    return item.id;
  }
}
