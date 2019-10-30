import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IBroadcast, Broadcast } from 'app/shared/model/core/broadcast.model';
import { BroadcastService } from './broadcast.service';
import { IChannelPublish } from 'app/shared/model/core/channel-publish.model';
import { ChannelPublishService } from 'app/entities/core/channel-publish';
import { FacebookService } from 'app/shared/social/FacebookService';

@Component({
  selector: 'jhi-broadcast-update',
  templateUrl: './broadcast-update.component.html'
})
export class BroadcastUpdateComponent implements OnInit {
  isSaving: boolean;

  channels: IChannelPublish[];

  editForm = this.fb.group({
    id: [],
    fromname: [null, [Validators.required]],
    fromemail: [null, [Validators.required]],
    title: [null, [Validators.required]],
    audiencejson: [null, [Validators.maxLength(1000)]],
    contenthtml: [],
    deliveryDateTime: [],
    tags: [null, [Validators.maxLength(500)]],
    status: [],
    createdByUser: [],
    createdDateTime: [],
    updatedByUser: [],
    updatedDateTime: [],
    domain: [],
    publishondatetime: [],
    publishdatetime: [],
    image: [],
    imageContentType: [],
    contentjson: [null, [Validators.maxLength(5000)]],
    channel: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected broadcastService: BroadcastService,
    protected channelService: ChannelPublishService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private facebookService: FacebookService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ broadcast }) => {
      this.updateForm(broadcast);
    });
    this.channelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IChannelPublish[]>) => mayBeOk.ok),
        map((response: HttpResponse<IChannelPublish[]>) => response.body)
      )
      .subscribe((res: IChannelPublish[]) => (this.channels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(broadcast: IBroadcast) {
    this.editForm.patchValue({
      id: broadcast.id,
      fromname: broadcast.fromname,
      fromemail: broadcast.fromemail,
      title: broadcast.title,
      audiencejson: broadcast.audiencejson,
      contenthtml: broadcast.contenthtml,
      deliveryDateTime: broadcast.deliveryDateTime != null ? broadcast.deliveryDateTime.format(DATE_TIME_FORMAT) : null,
      tags: broadcast.tags,
      status: broadcast.status,
      createdByUser: broadcast.createdByUser,
      createdDateTime: broadcast.createdDateTime != null ? broadcast.createdDateTime.format(DATE_TIME_FORMAT) : null,
      updatedByUser: broadcast.updatedByUser,
      updatedDateTime: broadcast.updatedDateTime != null ? broadcast.updatedDateTime.format(DATE_TIME_FORMAT) : null,
      domain: broadcast.domain,
      publishondatetime: broadcast.publishondatetime != null ? broadcast.publishondatetime.format(DATE_TIME_FORMAT) : null,
      publishdatetime: broadcast.publishdatetime != null ? broadcast.publishdatetime.format(DATE_TIME_FORMAT) : null,
      image: broadcast.image,
      imageContentType: broadcast.imageContentType,
      contentjson: broadcast.contentjson,
      channel: broadcast.channel
    });
  }

  share() {
    const broadcast = this.createFromForm();
    this.facebookService.share(broadcast).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  loadComments() {
    const broadcast = this.createFromForm();
    this.facebookService.loadComments(broadcast).subscribe(null);
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
    const broadcast = this.createFromForm();
    if (broadcast.id !== undefined) {
      this.subscribeToSaveResponse(this.broadcastService.update(broadcast));
    } else {
      this.subscribeToSaveResponse(this.broadcastService.create(broadcast));
    }
  }

  private createFromForm(): IBroadcast {
    return {
      ...new Broadcast(),
      id: this.editForm.get(['id']).value,
      fromname: this.editForm.get(['fromname']).value,
      fromemail: this.editForm.get(['fromemail']).value,
      title: this.editForm.get(['title']).value,
      audiencejson: this.editForm.get(['audiencejson']).value,
      contenthtml: this.editForm.get(['contenthtml']).value,
      deliveryDateTime:
        this.editForm.get(['deliveryDateTime']).value != null
          ? moment(this.editForm.get(['deliveryDateTime']).value, DATE_TIME_FORMAT)
          : undefined,
      tags: this.editForm.get(['tags']).value,
      status: this.editForm.get(['status']).value,
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
      domain: this.editForm.get(['domain']).value,
      publishondatetime:
        this.editForm.get(['publishondatetime']).value != null
          ? moment(this.editForm.get(['publishondatetime']).value, DATE_TIME_FORMAT)
          : undefined,
      publishdatetime:
        this.editForm.get(['publishdatetime']).value != null
          ? moment(this.editForm.get(['publishdatetime']).value, DATE_TIME_FORMAT)
          : undefined,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      contentjson: this.editForm.get(['contentjson']).value,
      channel: this.editForm.get(['channel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBroadcast>>) {
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

  trackChannelById(index: number, item: IChannelPublish) {
    return item.id;
  }
}
