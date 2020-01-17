import { TestBed, inject } from '@angular/core/testing';
import { APP_CONFIG } from '../../../app.config';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          StorageService,
          { provide: APP_CONFIG, useValue: {} }
        ]
    });
  });

  it('should be created storage service', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
