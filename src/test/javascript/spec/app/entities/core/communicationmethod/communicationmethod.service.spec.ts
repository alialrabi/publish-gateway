/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CommunicationmethodService } from 'app/entities/core/communicationmethod/communicationmethod.service';
import { ICommunicationmethod, Communicationmethod } from 'app/shared/model/core/communicationmethod.model';

describe('Service Tests', () => {
  describe('Communicationmethod Service', () => {
    let injector: TestBed;
    let service: CommunicationmethodService;
    let httpMock: HttpTestingController;
    let elemDefault: ICommunicationmethod;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CommunicationmethodService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Communicationmethod(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Communicationmethod', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDateTime: currentDate,
            updatedDateTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Communicationmethod(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Communicationmethod', async () => {
        const returnedFromService = Object.assign(
          {
            valueString: 'BBBBBB',
            countryCode: 'BBBBBB',
            createdByUser: 'BBBBBB',
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedByUser: 'BBBBBB',
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            domain: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDateTime: currentDate,
            updatedDateTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Communicationmethod', async () => {
        const returnedFromService = Object.assign(
          {
            valueString: 'BBBBBB',
            countryCode: 'BBBBBB',
            createdByUser: 'BBBBBB',
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedByUser: 'BBBBBB',
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            domain: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDateTime: currentDate,
            updatedDateTime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Communicationmethod', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
