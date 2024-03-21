import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandecongeDirecteurComponent } from './demandeconge-directeur.component';

describe('DemandecongeDirecteurComponent', () => {
  let component: DemandecongeDirecteurComponent;
  let fixture: ComponentFixture<DemandecongeDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandecongeDirecteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandecongeDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
