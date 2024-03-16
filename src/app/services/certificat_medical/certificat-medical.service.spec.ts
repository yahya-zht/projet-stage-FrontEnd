import { TestBed } from '@angular/core/testing';

import { CertificatMedicalService } from './certificat-medical.service';

describe('CertificatMedicalService', () => {
  let service: CertificatMedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificatMedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
