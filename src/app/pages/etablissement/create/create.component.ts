import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Personne } from 'src/app/Models/Personne';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  etablissementForm: FormGroup;
  Personnes: Personne[] = [];
  error: any;
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private etablissementService: EtablissementService,
    private personneService: PersonneService
  ) {
    this.etablissementForm = this.formBiulder.group({
      nom: [''],
      adresse: [''],
      directeur_id: [''],
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
    this.etablissementService
      .AddEtablissement(this.etablissementForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/etablissement']);
          });
        },
        (error) => {
          this.error = error.errors;
        }
      );
  }
}
