import { TestBed } from '@angular/core/testing';

import { OnSwipeService } from './on-swipe.service';

describe('OnSwipeService', () => {
  let service: OnSwipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnSwipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
