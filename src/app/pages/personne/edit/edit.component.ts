import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonneService } from 'src/app/services/personne.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Personne } from 'src/app/Models/Personne';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private personneService: PersonneService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.personneService
      .getPersonneById(this.getId)
      .subscribe((personne: Personne) => {
        console.log(personne.Personne['CIN']);
        this.updateForm.setValue({
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
  ngOnInit(): void {}
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
