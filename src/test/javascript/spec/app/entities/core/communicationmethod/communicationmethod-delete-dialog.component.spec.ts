/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CommunicationmethodDeleteDialogComponent } from 'app/entities/core/communicationmethod/communicationmethod-delete-dialog.component';
import { CommunicationmethodService } from 'app/entities/core/communicationmethod/communicationmethod.service';

describe('Component Tests', () => {
  describe('Communicationmethod Management Delete Component', () => {
    let comp: CommunicationmethodDeleteDialogComponent;
    let fixture: ComponentFixture<CommunicationmethodDeleteDialogComponent>;
    let service: CommunicationmethodService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CommunicationmethodDeleteDialogComponent]
      })
        .overrideTemplate(CommunicationmethodDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommunicationmethodDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommunicationmethodService);
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
