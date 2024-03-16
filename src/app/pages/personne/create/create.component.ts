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
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private personneService: PersonneService,
    private echelleService: EchelleService,
    private fonctionService: FonctionService,
    private gradeService: GradeService
  ) {
    this.personneForm = this.formBiulder.group({
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
        console.log('echelle dataSource:', this.Echelle);
        console.log('echelle :', this.Echelle[0].libelle);
      },
      (error) => {
        console.error('Error fetching personnes:', error);
      }
    );
    this.fonctionService.getAllFonction().subscribe(
      (fonction: any) => {
        this.Fonction = fonction.Fonctions;
        console.log('Grade dataSource:', this.Fonction);
      },
      (error) => {
        console.error('Error fetching personnes:', error);
      }
    );
    this.gradeService.getAllGrade().subscribe(
      (grade: any) => {
        this.Grade = grade.AllGrade;
        console.log('Grade dataSource:', this.Grade);
      },
      (error) => {
        console.error('Error fetching personnes:', error);
      }
    );
  }
  onSubmit(): any {
    this.personneService.AddPersonne(this.personneForm.value).subscribe(
      () => {
        console.log('Data added successfully');
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
