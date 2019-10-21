/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CommunicationmethodDetailComponent } from 'app/entities/core/communicationmethod/communicationmethod-detail.component';
import { Communicationmethod } from 'app/shared/model/core/communicationmethod.model';

describe('Component Tests', () => {
  describe('Communicationmethod Management Detail Component', () => {
    let comp: CommunicationmethodDetailComponent;
    let fixture: ComponentFixture<CommunicationmethodDetailComponent>;
    const route = ({ data: of({ communicationmethod: new Communicationmethod(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CommunicationmethodDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CommunicationmethodDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommunicationmethodDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.communicationmethod).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
