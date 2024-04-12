import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Personne } from 'src/app/Models/Personne';
import { Service } from 'src/app/Models/Service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  etablissementForm: FormGroup;
  Personnes: Personne[] = [];
  Service: Service[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private etablissementService: EtablissementService,
    private personneService: PersonneService,
    private serviceService: ServiceService,
  ) {
    this.etablissementForm = this.formBuilder.group({
      nom: [''],
      adresse: [''],
      directeur_id: [''],
      services_id: [],
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
    this.serviceService.getAllService().subscribe(
      (service: any) => {
        this.Service = service.Services;
        console.log('Service dataSource:', this.Service);
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
