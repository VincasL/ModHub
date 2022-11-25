import { TestBed } from '@angular/core/testing';

import { ModsRestService } from './mods-rest.service';

describe('ModsRestService', () => {
  let service: ModsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
