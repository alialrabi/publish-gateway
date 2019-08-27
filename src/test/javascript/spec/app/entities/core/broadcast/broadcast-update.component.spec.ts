/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BroadcastUpdateComponent } from 'app/entities/core/broadcast/broadcast-update.component';
import { BroadcastService } from 'app/entities/core/broadcast/broadcast.service';
import { Broadcast } from 'app/shared/model/core/broadcast.model';

describe('Component Tests', () => {
  describe('Broadcast Management Update Component', () => {
    let comp: BroadcastUpdateComponent;
    let fixture: ComponentFixture<BroadcastUpdateComponent>;
    let service: BroadcastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BroadcastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BroadcastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BroadcastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BroadcastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Broadcast(123);
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
        const entity = new Broadcast();
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
