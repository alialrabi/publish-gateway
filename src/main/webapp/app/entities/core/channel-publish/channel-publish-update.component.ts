import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IChannelPublish, ChannelPublish } from 'app/shared/model/core/channel-publish.model';
import { ChannelPublishService } from './channel-publish.service';

@Component({
  selector: 'jhi-channel-publish-update',
  templateUrl: './channel-publish-update.component.html'
})
export class ChannelPublishUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    description: [null, [Validators.maxLength(255)]],
    type: [null, [Validators.maxLength(255)]],
    channeltype: [null, [Validators.maxLength(255)]],
    details: [null, [Validators.maxLength(10000)]],
    createdByUser: [null, [Validators.required, Validators.maxLength(100)]],
    createdDateTime: [null, [Validators.required]],
    updatedByUser: [null, [Validators.required, Validators.maxLength(100)]],
    updatedDateTime: [null, [Validators.required]],
    status: [null, [Validators.required, Validators.maxLength(25)]],
    domain: [null, [Validators.required, Validators.maxLength(25)]]
  });

  constructor(protected channelService: ChannelPublishService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ channel }) => {
      this.updateForm(channel);
    });
  }

  updateForm(channel: IChannelPublish) {
    this.editForm.patchValue({
      id: channel.id,
      name: channel.name,
      description: channel.description,
      type: channel.type,
      channeltype: channel.channeltype,
      details: channel.details,
      createdByUser: channel.createdByUser,
      createdDateTime: channel.createdDateTime != null ? channel.createdDateTime.format(DATE_TIME_FORMAT) : null,
      updatedByUser: channel.updatedByUser,
      updatedDateTime: channel.updatedDateTime != null ? channel.updatedDateTime.format(DATE_TIME_FORMAT) : null,
      status: channel.status,
      domain: channel.domain
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const channel = this.createFromForm();
    if (channel.id !== undefined) {
      this.subscribeToSaveResponse(this.channelService.update(channel));
    } else {
      this.subscribeToSaveResponse(this.channelService.create(channel));
    }
  }

  private createFromForm(): IChannelPublish {
    return {
      ...new ChannelPublish(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      type: this.editForm.get(['type']).value,
      channeltype: this.editForm.get(['channeltype']).value,
      details: this.editForm.get(['details']).value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChannelPublish>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
