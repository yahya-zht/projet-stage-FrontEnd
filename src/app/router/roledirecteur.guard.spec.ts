import { TestBed } from '@angular/core/testing';

import { RoledirecteurGuard } from './roledirecteur.guard';

describe('RoledirecteurGuard', () => {
  let guard: RoledirecteurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoledirecteurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
