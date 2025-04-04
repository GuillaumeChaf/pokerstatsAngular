import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComputationService } from './computation.service';
import { ComputePrompt } from '../models/compute-prompt';
import { Player } from '../models/player';
import { Card, Symbol } from '../models/card';
import { environment } from 'src/environments/environment';

describe('ComputationService', () => {
  let service: ComputationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComputationService],
    });
    service = TestBed.inject(ComputationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should return good value when empty table', () => {
    let mockEmptyTable: ComputePrompt;
    beforeEach(() => {
      mockEmptyTable = testClassicComputePrompt;
    });

    it('should launch a request', () => {
      service.compute(mockEmptyTable);
      const req = httpMock.expectOne(environment.domain);
      expect(req.request.method).toBe('POST');
    });
    it('should update callbackSig', () => {
      expect(service.callbackSig()).toEqual({});
      service.compute(mockEmptyTable);
      const req = httpMock.expectOne(environment.domain);

      expect(service.callbackSig()).not.toEqual({});
    });

    afterEach(() => {
      httpMock.verify();
    });
  });

  describe('should update callbackSig return good value when empty table', () => {
    let mockFullyTable: ComputePrompt;
    beforeEach(() => {
      mockFullyTable = testClassicComputePrompt;
    });
    it('should launch a request', () => {
      service.compute(mockFullyTable);
      const req = httpMock.expectOne(environment.domain);
      expect(req.request.method).toBe('POST');
    });

    it('should update callbackSig', () => {
      expect(service.callbackSig()).toEqual({});
      service.compute(mockFullyTable);
      const req = httpMock.expectOne(environment.domain);

      expect(service.callbackSig()).not.toEqual({});
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

export const testClassicComputePrompt: ComputePrompt = new ComputePrompt();
//     {
//   players: { 4: new Player(), 5: new Player() },
//   table: {},
//   trash: [],
// }
//{ card1: new C, card2: new Card() }), 5: new Player({ card1: new Card(), card2: new Card() }
