import { TestBed } from '@angular/core/testing';

import { CvResolverService } from './cv-resolver.service';

describe('CvResolverService', () => {
  let service: CvResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
