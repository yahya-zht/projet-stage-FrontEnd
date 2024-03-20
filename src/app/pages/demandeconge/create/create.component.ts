import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Personne } from 'src/app/Models/Personne';
import { DemandeCongeService } from 'src/app/services/demande_conge/demande-conge.service';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  demandeCongeForm: FormGroup;
  Personnes: Personne[] = [];
  error: any;
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private demandeCongeService: DemandeCongeService,
    private personneService: PersonneService
  ) {
    this.demandeCongeForm = this.formBiulder.group({
      dateDebut: [''],
      dateFin: [''],
      personne_id: [''],
      dateDemande: [''],
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
  }
  onSubmit(): any {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    this.demandeCongeForm.value.dateDemande = currentDate;
    const selectedDateDebut: Date = this.demandeCongeForm.value.dateDebut;
    const selectedDateFin: Date = this.demandeCongeForm.value.dateFin;
    if (selectedDateDebut) {
      const DateDebut: string = `${selectedDateDebut.getFullYear()}-${
        Number(selectedDateDebut.getMonth()) + 1
      }-${selectedDateDebut.getDate()}`;
      this.demandeCongeForm.value.dateDebut = DateDebut;
    }
    if (selectedDateFin) {
      const DateFin: string = `${selectedDateFin.getFullYear()}-${
        Number(selectedDateFin.getMonth()) + 1
      }-${selectedDateFin.getDate()}`;
      this.demandeCongeForm.value.dateFin = DateFin;
    }
    this.demandeCongeService
      .AddDemandeConge(this.demandeCongeForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/demande/conge']);
          });
        },
        (error) => {
          this.error = error.errors;
        }
      );
    // console.log('data Form: ' + JSON.stringify(this.demandeCongeForm.value));
  }
}
