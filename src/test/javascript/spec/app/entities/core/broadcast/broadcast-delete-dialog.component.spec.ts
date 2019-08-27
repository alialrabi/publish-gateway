/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { BroadcastDeleteDialogComponent } from 'app/entities/core/broadcast/broadcast-delete-dialog.component';
import { BroadcastService } from 'app/entities/core/broadcast/broadcast.service';

describe('Component Tests', () => {
  describe('Broadcast Management Delete Component', () => {
    let comp: BroadcastDeleteDialogComponent;
    let fixture: ComponentFixture<BroadcastDeleteDialogComponent>;
    let service: BroadcastService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BroadcastDeleteDialogComponent]
      })
        .overrideTemplate(BroadcastDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BroadcastDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BroadcastService);
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
