import { TestBed } from '@angular/core/testing';

import { MovieCatService } from './movie-cat.service';

describe('MovieCatService', () => {
  let service: MovieCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
