import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAddress, Address } from 'app/shared/model/core/address.model';
import { AddressService } from './address.service';
import { IContact } from 'app/shared/model/core/contact.model';
import { ContactService } from 'app/entities/core/contact';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
  isSaving: boolean;

  contacts: IContact[];

  editForm = this.fb.group({
    id: [],
    address1: [],
    city: [],
    state: [],
    zipcode: [],
    country: [],
    createdByUser: [],
    createdDateTime: [],
    updatedByUser: [],
    updatedDateTime: [],
    status: [],
    domain: [null, [Validators.required]],
    addressType: [],
    contact: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected addressService: AddressService,
    protected contactService: ContactService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);
    });
    this.contactService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IContact[]>) => mayBeOk.ok),
        map((response: HttpResponse<IContact[]>) => response.body)
      )
      .subscribe((res: IContact[]) => (this.contacts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(address: IAddress) {
    this.editForm.patchValue({
      id: address.id,
      address1: address.address1,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
      createdByUser: address.createdByUser,
      createdDateTime: address.createdDateTime != null ? address.createdDateTime.format(DATE_TIME_FORMAT) : null,
      updatedByUser: address.updatedByUser,
      updatedDateTime: address.updatedDateTime != null ? address.updatedDateTime.format(DATE_TIME_FORMAT) : null,
      status: address.status,
      domain: address.domain,
      addressType: address.addressType,
      contact: address.contact
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id']).value,
      address1: this.editForm.get(['address1']).value,
      city: this.editForm.get(['city']).value,
      state: this.editForm.get(['state']).value,
      zipcode: this.editForm.get(['zipcode']).value,
      country: this.editForm.get(['country']).value,
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
      addressType: this.editForm.get(['addressType']).value,
      contact: this.editForm.get(['contact']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>) {
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
