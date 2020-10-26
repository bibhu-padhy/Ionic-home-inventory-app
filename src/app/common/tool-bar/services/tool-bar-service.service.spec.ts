import { TestBed } from '@angular/core/testing';

import { ToolBarServiceService } from './tool-bar-service.service';

describe('ToolBarServiceService', () => {
  let service: ToolBarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolBarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
