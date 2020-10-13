import { TestBed } from '@angular/core/testing';

import { PayOrderService } from './pay-order.service';

describe('PayOrderService', () => {
  let service: PayOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
