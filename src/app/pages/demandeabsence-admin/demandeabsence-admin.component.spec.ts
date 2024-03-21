import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeabsenceAdminComponent } from './demandeabsence-admin.component';

describe('DemandeabsenceAdminComponent', () => {
  let component: DemandeabsenceAdminComponent;
  let fixture: ComponentFixture<DemandeabsenceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeabsenceAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeabsenceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
