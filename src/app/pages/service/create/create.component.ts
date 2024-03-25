import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/Models/Etablissement';
import { Personne } from 'src/app/Models/Personne';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  serviceForm: FormGroup;
  Personnes: Personne[] = [];
  Etablissement: Etablissement[]  = [];
  error: any;
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private serviceService: ServiceService,
    private personneService: PersonneService,
    private etablissementService: EtablissementService
  ) {
    this.serviceForm = this.formBiulder.group({
      nom: [''],
      responsable_id: [''],
      nombre_employes: [''],
      etablissements_id: [''],
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
    this.etablissementService.getAllEtablissement().subscribe(
      (etablissement: any) => {
        this.Etablissement = etablissement.Etablissements;
        console.log('etablissement dataSource:', this.Etablissement);
      },
      (error) => {
        console.error('Error fetching Service:', error);
      }
    );
  }
  onSubmit(): any {
    // console.log(this.serviceForm.value);
    this.serviceService.AddService(this.serviceForm.value).subscribe(
      () => {
        console.log('Data added successfully');
        this.ngZone.run(() => {
          this.router.navigate(['/service']);
        });
      },
      (error) => {
        this.error = error.errors;
      }
    );
  }
}
