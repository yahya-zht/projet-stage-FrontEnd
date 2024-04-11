import { TestBed } from '@angular/core/testing';

import { RolechefGuard } from './rolechef.guard';

describe('RolechefGuard', () => {
  let guard: RolechefGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolechefGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
