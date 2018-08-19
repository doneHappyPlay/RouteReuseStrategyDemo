import { TestBed, inject } from '@angular/core/testing';

import { InteractiveService } from './interactive.service';

describe('InteractiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractiveService]
    });
  });

  it('should be created', inject([InteractiveService], (service: InteractiveService) => {
    expect(service).toBeTruthy();
  }));
});
