import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeabsenceComponent } from './demandeabsence.component';

describe('DemandeabsenceComponent', () => {
  let component: DemandeabsenceComponent;
  let fixture: ComponentFixture<DemandeabsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeabsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeabsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
