import { TestBed } from '@angular/core/testing';

import { RoleemployeeGuard } from './roleemployee.guard';

describe('RoleemployeeGuard', () => {
  let guard: RoleemployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleemployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
