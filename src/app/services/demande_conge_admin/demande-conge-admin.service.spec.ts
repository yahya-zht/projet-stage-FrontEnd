import { TestBed } from '@angular/core/testing';

import { DemandeCongeAdminService } from './demande-conge-admin.service';

describe('DemandeCongeAdminService', () => {
  let service: DemandeCongeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeCongeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
