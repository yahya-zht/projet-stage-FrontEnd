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
  Service: Service[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private etablissementService: EtablissementService,
    private personneService: PersonneService,
    private serviceService: ServiceService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.etablissementService
      .getEtablissementById(this.getId)
      .subscribe((etablissement: Etablissement) => {
        console.log('Etablissement ====>>>> ' + etablissement);
        this.updateForm.patchValue({
          nom: etablissement.Etablissement['nom'],
          adresse: etablissement.Etablissement.adresse,
          directeur_id: etablissement.Etablissement.directeur_id,
          services_id: Array.isArray(etablissement.service)
            ? etablissement.service.map((service: { id: any }) => service.id)
            : [],
        });
      });
    this.updateForm = this.formBuilder.group({
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
  onUpdate(): any {
    console.log(this.updateForm.value);
    this.etablissementService
      .updateEtablissement(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          console.log('Data updated successfully');
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
