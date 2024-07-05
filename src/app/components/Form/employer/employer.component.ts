// import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PersonneService } from 'src/app/services/personne/personne.service';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Echelle } from 'src/app/Models/Echelle';
import { EchelleService } from 'src/app/services/echelle/echelle.service';
import { Fonction } from 'src/app/Models/Fonction';
import { Grade } from 'src/app/Models/Grade';
import { FonctionService } from 'src/app/services/fonction/fonction.service';
import { GradeService } from 'src/app/services/grade/grade.service';
import { Service } from 'src/app/Models/Service';
import { ServiceService } from 'src/app/services/service/service.service';
import { Personne } from 'src/app/Models/Personne';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { Etablissement } from 'src/app/Models/Etablissement';
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class EmployerComponent implements OnInit {
  personneForm: FormGroup;
  Echelle: Echelle[] = [];
  Fonction: Fonction[] = [];
  Etablissements: Etablissement[] = [];
  Grade: Grade[] = [];
  Service: Service[] = [];
  Personnes: Personne[] = [];
  error: any;
  errordb: any;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private personneService: PersonneService,
    private echelleService: EchelleService,
    private fonctionService: FonctionService,
    private gradeService: GradeService,
    private serviceService: ServiceService,
    private etablissementService: EtablissementService
  ) {
    this.personneForm = this._formBuilder.group({
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
      etablissement_id: [''],
    });
    this.firstFormGroup.controls['firstCtrl'].valueChanges.forEach((value) => {
      console.log(value);
      console.log('1');
    });
    this.secondFormGroup.controls['secondCtrl'].valueChanges.forEach(
      (value) => {
        console.log(value);
        console.log('2');
      }
    );
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

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
    this.etablissementService.getAllEtablissement().subscribe(
      (Etablissements: any) => {
        this.Etablissements = Etablissements.Etablissements;
        console.log('Etablissements dataSource:', this.Fonction);
      },
      (error) => {
        console.error('Error fetching Etablissements:', error);
      }
    );
  }
}
