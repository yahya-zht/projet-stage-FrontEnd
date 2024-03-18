import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personne } from 'src/app/Models/Personne';
import { Service } from 'src/app/Models/Service';
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
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private personneService: PersonneService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.serviceService
      .getServiceById(this.getId)
      .subscribe((service: Service) => {
        this.updateForm.patchValue({
          nom: service.Service.nom,
          responsable_id: service.Service.responsable_id,
          nombre_employes: service.Service.nombre_employes,
        });
      });
    this.updateForm = this.formBuilder.group({
      nom: [''],
      responsable_id: [''],
      nombre_employes: [''],
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
  }
  onUpdate(): any {
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
  }
}
