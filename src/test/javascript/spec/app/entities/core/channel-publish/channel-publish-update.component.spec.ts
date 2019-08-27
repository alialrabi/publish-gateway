/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ChannelPublishUpdateComponent } from 'app/entities/core/channel-publish/channel-publish-update.component';
import { ChannelPublishService } from 'app/entities/core/channel-publish/channel-publish.service';
import { ChannelPublish } from 'app/shared/model/core/channel-publish.model';

describe('Component Tests', () => {
  describe('ChannelPublish Management Update Component', () => {
    let comp: ChannelPublishUpdateComponent;
    let fixture: ComponentFixture<ChannelPublishUpdateComponent>;
    let service: ChannelPublishService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChannelPublishUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChannelPublishUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChannelPublishUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChannelPublishService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChannelPublish(123);
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
        const entity = new ChannelPublish();
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
