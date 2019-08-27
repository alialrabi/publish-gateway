/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ChannelPublishDeleteDialogComponent } from 'app/entities/core/channel-publish/channel-publish-delete-dialog.component';
import { ChannelPublishService } from 'app/entities/core/channel-publish/channel-publish.service';

describe('Component Tests', () => {
  describe('ChannelPublish Management Delete Component', () => {
    let comp: ChannelPublishDeleteDialogComponent;
    let fixture: ComponentFixture<ChannelPublishDeleteDialogComponent>;
    let service: ChannelPublishService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChannelPublishDeleteDialogComponent]
      })
        .overrideTemplate(ChannelPublishDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChannelPublishDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChannelPublishService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
