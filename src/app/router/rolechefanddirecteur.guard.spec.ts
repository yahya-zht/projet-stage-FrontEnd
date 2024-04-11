import { TestBed } from '@angular/core/testing';

import { RolechefanddirecteurGuard } from './rolechefanddirecteur.guard';

describe('RolechefanddirecteurGuard', () => {
  let guard: RolechefanddirecteurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolechefanddirecteurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
