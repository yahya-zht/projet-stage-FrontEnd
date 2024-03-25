import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from 'src/app/Models/Etablissement';
import { Personne } from 'src/app/Models/Personne';
import { Service } from 'src/app/Models/Service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  Personnes: Personne[] = [];
  Etablissement: Etablissement[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private personneService: PersonneService,
    private etablissementService: EtablissementService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.serviceService
      .getServiceById(this.getId)
      .subscribe((service: Service) => {
        console.log(service.Service.etablissement);
        this.updateForm.patchValue({
          nom: service.Service.nom,
          responsable_id: service.Service.responsable_id,
          nombre_employes: service.Service.nombre_employes,
          etablissements_id: service.Service.etablissement.id,
        });
      });
    this.updateForm = this.formBuilder.group({
      nom: [''],
      responsable_id: [''],
      nombre_employes: [''],
      etablissements_id: [],
    });
  }

  ngOnInit(): void {
    this.personneService.getAllPersonnes().subscribe(
      (personne: any) => {
        this.Personnes = personne.Personnes;
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
  onUpdate(): any {
    console.log(this.updateForm.value);
    this.serviceService
      .updateService(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/service']);
          });
        },
        (error) => {
          this.error = error.errors;
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
}
