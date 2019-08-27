/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ChannelPublishDetailComponent } from 'app/entities/core/channel-publish/channel-publish-detail.component';
import { ChannelPublish } from 'app/shared/model/core/channel-publish.model';

describe('Component Tests', () => {
  describe('ChannelPublish Management Detail Component', () => {
    let comp: ChannelPublishDetailComponent;
    let fixture: ComponentFixture<ChannelPublishDetailComponent>;
    const route = ({ data: of({ channel: new ChannelPublish(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChannelPublishDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChannelPublishDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChannelPublishDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.channel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
