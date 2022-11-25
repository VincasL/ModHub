import { TestBed } from '@angular/core/testing';

import { CommentsRestService } from './comments-rest.service';

describe('CommentsRestService', () => {
  let service: CommentsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
