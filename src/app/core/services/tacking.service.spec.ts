import { TestBed } from '@angular/core/testing';

import { TackingService } from './tacking.service';

describe('TackingService', () => {
  let service: TackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
