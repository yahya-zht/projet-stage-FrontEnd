import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Personne } from 'src/app/Models/Personne';
import { Echelle } from 'src/app/Models/Echelle';
import { Fonction } from 'src/app/Models/Fonction';
import { Grade } from 'src/app/Models/Grade';
import { Service } from 'src/app/Models/Service';
import { EchelleService } from 'src/app/services/echelle/echelle.service';
import { FonctionService } from 'src/app/services/fonction/fonction.service';
import { GradeService } from 'src/app/services/grade/grade.service';
import { ServiceService } from 'src/app/services/service/service.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  Echelle: Echelle[] = [];
  Fonction: Fonction[] = [];
  Grade: Grade[] = [];
  Service: Service[] = [];
  Personnes: Personne[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private personneService: PersonneService,
    private echelleService: EchelleService,
    private fonctionService: FonctionService,
    private gradeService: GradeService,
    private serviceService: ServiceService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.personneService
      .getPersonneById(this.getId)
      .subscribe((personne: Personne) => {
        console.log(personne.Personne['chef_id']);
        this.updateForm.patchValue({
          CIN: personne.Personne['CIN'],
          nom: personne.Personne['nom'],
          prenom: personne.Personne['prenom'],
          date_naissance: personne.Personne['date_naissance'],
          telephone: personne.Personne['telephone'],
          adresse: personne.Personne['adresse'],
          role: personne.Personne['role'],
          chef_id: personne.Personne['chef_id'],
          grade_id: personne.Personne['grade_id'],
          fonction_id: personne.Personne['fonction_id'],
          echelle_id: personne.Personne['echelle_id'],
          service_id: personne.Personne['service_id'],
        });
      });
    this.updateForm = this.formBuilder.group({
      CIN: [''],
      nom: [''],
      prenom: [''],
      date_naissance: [''],
      telephone: [''],
      adresse: [''],
      role: [''],
      chef_id: [''],
      grade_id: [''],
      fonction_id: [''],
      echelle_id: [''],
      service_id: [''],
    });
  }
  ngOnInit(): void {
    this.echelleService.getAllEchelle().subscribe(
      (echelle: any) => {
        this.Echelle = echelle.Echelles;
        console.log('Echelle dataSource:', this.Echelle);
      },
      (error) => {
        console.error('Error fetching Echelle:', error);
      }
    );
    this.fonctionService.getAllFonction().subscribe(
      (fonction: any) => {
        this.Fonction = fonction.Fonctions;
        console.log('Fonction dataSource:', this.Fonction);
      },
      (error) => {
        console.error('Error fetching Founction:', error);
      }
    );
    this.gradeService.getAllGrade().subscribe(
      (grade: any) => {
        this.Grade = grade.AllGrade;
        console.log('Grade dataSource:', this.Grade);
      },
      (error) => {
        console.error('Error fetching Grade:', error);
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
  onUpdate(): any {
    this.personneService
      .updatePersonne(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/personne']);
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
