import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PersonneService } from 'src/app/services/personne/personne.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Echelle } from 'src/app/Models/Echelle';
import { EchelleService } from 'src/app/services/echelle/echelle.service';
import { Fonction } from 'src/app/Models/Fonction';
import { Grade } from 'src/app/Models/Grade';
import { FonctionService } from 'src/app/services/fonction/fonction.service';
import { GradeService } from 'src/app/services/grade/grade.service';
import { Service } from 'src/app/Models/Service';
import { ServiceService } from 'src/app/services/service/service.service';
import { Personne } from 'src/app/Models/Personne';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  personneForm: FormGroup;
  Echelle: Echelle[] = [];
  Fonction: Fonction[] = [];
  Grade: Grade[] = [];
  Service: Service[] = [];
  Personnes: Personne[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private personneService: PersonneService,
    private echelleService: EchelleService,
    private fonctionService: FonctionService,
    private gradeService: GradeService,
    private serviceService: ServiceService,
  ) {
    this.personneForm = this.formBuilder.group({
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
  onSubmit(): any {
    const selectedDate: Date = this.personneForm.value.date_naissance;
    if (selectedDate) {
      const DateNess: string = `${selectedDate.getFullYear()}-${
        Number(selectedDate.getMonth()) + 1
      }-${selectedDate.getDate()}`;
      this.personneForm.value.date_naissance = DateNess;
    }
    this.personneService.AddPersonne(this.personneForm.value).subscribe(
      () => {
        console.log('Data added successfully');
        this.ngZone.run(() => {
          this.router.navigate(['/personne']);
        });
      },
      (error) => {
        this.error = error.errors;
      }
    );
  }
}
