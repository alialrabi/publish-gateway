/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BroadcastDetailComponent } from 'app/entities/core/broadcast/broadcast-detail.component';
import { Broadcast } from 'app/shared/model/core/broadcast.model';

describe('Component Tests', () => {
  describe('Broadcast Management Detail Component', () => {
    let comp: BroadcastDetailComponent;
    let fixture: ComponentFixture<BroadcastDetailComponent>;
    const route = ({ data: of({ broadcast: new Broadcast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BroadcastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BroadcastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BroadcastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.broadcast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
