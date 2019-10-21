import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IContact, Contact } from 'app/shared/model/core/contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'jhi-contact-update',
  templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nameFirst: [],
    nameLast: [],
    title: [],
    company: [],
    contactImage: [],
    contactImageContentType: [],
    createdByUser: [],
    createdDateTime: [],
    updatedByUser: [],
    updatedDateTime: [],
    status: [],
    domain: [null, [Validators.required]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected contactService: ContactService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.updateForm(contact);
    });
  }

  updateForm(contact: IContact) {
    this.editForm.patchValue({
      id: contact.id,
      nameFirst: contact.nameFirst,
      nameLast: contact.nameLast,
      title: contact.title,
      company: contact.company,
      contactImage: contact.contactImage,
      contactImageContentType: contact.contactImageContentType,
      createdByUser: contact.createdByUser,
      createdDateTime: contact.createdDateTime != null ? contact.createdDateTime.format(DATE_TIME_FORMAT) : null,
      updatedByUser: contact.updatedByUser,
      updatedDateTime: contact.updatedDateTime != null ? contact.updatedDateTime.format(DATE_TIME_FORMAT) : null,
      status: contact.status,
      domain: contact.domain
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contact = this.createFromForm();
    if (contact.id !== undefined) {
      this.subscribeToSaveResponse(this.contactService.update(contact));
    } else {
      this.subscribeToSaveResponse(this.contactService.create(contact));
    }
  }

  private createFromForm(): IContact {
    return {
      ...new Contact(),
      id: this.editForm.get(['id']).value,
      nameFirst: this.editForm.get(['nameFirst']).value,
      nameLast: this.editForm.get(['nameLast']).value,
      title: this.editForm.get(['title']).value,
      company: this.editForm.get(['company']).value,
      contactImageContentType: this.editForm.get(['contactImageContentType']).value,
      contactImage: this.editForm.get(['contactImage']).value,
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
      domain: this.editForm.get(['domain']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>) {
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
}
