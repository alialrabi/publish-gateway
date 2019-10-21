/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CommunicationmethodUpdateComponent } from 'app/entities/core/communicationmethod/communicationmethod-update.component';
import { CommunicationmethodService } from 'app/entities/core/communicationmethod/communicationmethod.service';
import { Communicationmethod } from 'app/shared/model/core/communicationmethod.model';

describe('Component Tests', () => {
  describe('Communicationmethod Management Update Component', () => {
    let comp: CommunicationmethodUpdateComponent;
    let fixture: ComponentFixture<CommunicationmethodUpdateComponent>;
    let service: CommunicationmethodService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CommunicationmethodUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CommunicationmethodUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommunicationmethodUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommunicationmethodService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Communicationmethod(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Communicationmethod();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
