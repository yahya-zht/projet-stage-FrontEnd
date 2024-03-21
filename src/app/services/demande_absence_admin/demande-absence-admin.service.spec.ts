import { TestBed } from '@angular/core/testing';

import { DemandeAbsenceAdminService } from './demande-absence-admin.service';

describe('DemandeAbsenceAdminService', () => {
  let service: DemandeAbsenceAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeAbsenceAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
