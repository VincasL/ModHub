import { TestBed } from '@angular/core/testing';

import { ImagesRestService } from './images-rest.service';

describe('ImagesRestService', () => {
  let service: ImagesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
