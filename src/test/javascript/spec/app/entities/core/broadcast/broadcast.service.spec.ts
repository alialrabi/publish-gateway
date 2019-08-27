/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BroadcastService } from 'app/entities/core/broadcast/broadcast.service';
import { IBroadcast, Broadcast } from 'app/shared/model/core/broadcast.model';

describe('Service Tests', () => {
  describe('Broadcast Service', () => {
    let injector: TestBed;
    let service: BroadcastService;
    let httpMock: HttpTestingController;
    let elemDefault: IBroadcast;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(BroadcastService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Broadcast(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        currentDate,
        currentDate,
        'image/png',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            deliveryDateTime: currentDate.format(DATE_TIME_FORMAT),
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT),
            publishondatetime: currentDate.format(DATE_TIME_FORMAT),
            publishdatetime: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Broadcast', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            deliveryDateTime: currentDate.format(DATE_TIME_FORMAT),
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT),
            publishondatetime: currentDate.format(DATE_TIME_FORMAT),
            publishdatetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            deliveryDateTime: currentDate,
            createdDateTime: currentDate,
            updatedDateTime: currentDate,
            publishondatetime: currentDate,
            publishdatetime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Broadcast(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Broadcast', async () => {
        const returnedFromService = Object.assign(
          {
            fromname: 'BBBBBB',
            fromemail: 'BBBBBB',
            title: 'BBBBBB',
            audiencejson: 'BBBBBB',
            contenthtml: 'BBBBBB',
            deliveryDateTime: currentDate.format(DATE_TIME_FORMAT),
            tags: 'BBBBBB',
            status: 'BBBBBB',
            createdByUser: 'BBBBBB',
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedByUser: 'BBBBBB',
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT),
            domain: 'BBBBBB',
            publishondatetime: currentDate.format(DATE_TIME_FORMAT),
            publishdatetime: currentDate.format(DATE_TIME_FORMAT),
            image: 'BBBBBB',
            contentjson: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            deliveryDateTime: currentDate,
            createdDateTime: currentDate,
            updatedDateTime: currentDate,
            publishondatetime: currentDate,
            publishdatetime: currentDate
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

      it('should return a list of Broadcast', async () => {
        const returnedFromService = Object.assign(
          {
            fromname: 'BBBBBB',
            fromemail: 'BBBBBB',
            title: 'BBBBBB',
            audiencejson: 'BBBBBB',
            contenthtml: 'BBBBBB',
            deliveryDateTime: currentDate.format(DATE_TIME_FORMAT),
            tags: 'BBBBBB',
            status: 'BBBBBB',
            createdByUser: 'BBBBBB',
            createdDateTime: currentDate.format(DATE_TIME_FORMAT),
            updatedByUser: 'BBBBBB',
            updatedDateTime: currentDate.format(DATE_TIME_FORMAT),
            domain: 'BBBBBB',
            publishondatetime: currentDate.format(DATE_TIME_FORMAT),
            publishdatetime: currentDate.format(DATE_TIME_FORMAT),
            image: 'BBBBBB',
            contentjson: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            deliveryDateTime: currentDate,
            createdDateTime: currentDate,
            updatedDateTime: currentDate,
            publishondatetime: currentDate,
            publishdatetime: currentDate
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

      it('should delete a Broadcast', async () => {
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
