import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Personne } from 'src/app/Models/Personne';
import { DemandeAbsenceService } from 'src/app/services/demande_absence/demande-absence.service';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  demandeAbsenceForm: FormGroup;
  Personnes: Personne[] = [];
  Duree: number = 0;
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private demandeAbsenceService: DemandeAbsenceService,
    private personneService: PersonneService
  ) {
    this.demandeAbsenceForm = this.formBuilder.group({
      dateDebut: [''],
      dateFin: [''],
      // personne_id: [''],
      dateDemande: [''],
      type: [''],
      duree: this.Duree,
    });
  }

  ngOnInit(): void {
    this.personneService.getAllPersonnes().subscribe(
      (personne: any) => {
        this.Personnes = personne.Personnes;
        console.log('Personnes dataSource:', this.Personnes);
      },
      (error) => {
        console.error('Error fetching Service:', error);
      }
    );
    this.demandeAbsenceForm.valueChanges.subscribe(() => {
      this.calculateDuration();
    });
  }
  calculateDuration(): void {
    const dateDebut: Date = this.demandeAbsenceForm.value.dateDebut;
    const dateFin: Date = this.demandeAbsenceForm.value.dateFin;
    if (
      !dateDebut ||
      !dateFin ||
      isNaN(dateDebut.getTime()) ||
      isNaN(dateFin.getTime())
    ) {
      console.log('Invalid dates');
      this.demandeAbsenceForm.patchValue({ duree: '0' }, { emitEvent: false });
      return;
    }
    const differenceInMilliseconds: number =
      dateFin.getTime() - dateDebut.getTime();
    const differenceInDays: number =
      differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const differenceInDaysINT = Math.ceil(differenceInDays);
    this.demandeAbsenceForm.patchValue(
      { duree: differenceInDaysINT + 1 },
      { emitEvent: false }
    );
  }
  private getCurrentDateString(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
  private setDate(controlName: string): void {
    const selectedDate: Date = this.demandeAbsenceForm.value[controlName];
    if (selectedDate) {
      const Date: string = `${selectedDate.getFullYear()}-${
        Number(selectedDate.getMonth()) + 1
      }-${selectedDate.getDate()}`;
      this.demandeAbsenceForm.value[controlName] = Date;
    }
  }
  onSubmit(): void {
    const currentDate: string = this.getCurrentDateString();
    this.demandeAbsenceForm.controls['dateDemande'].setValue(currentDate);
    this.setDate('dateDebut');
    this.setDate('dateFin');
    this.demandeAbsenceService
      .AddDemandeAbsence(this.demandeAbsenceForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/demande/absence']);
          });
        },
        (error) => {
          this.error = error.errors;
        }
      );
  }
}
