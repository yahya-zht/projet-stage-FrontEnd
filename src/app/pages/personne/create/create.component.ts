import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PersonneService } from 'src/app/services/personne.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  personneForm: FormGroup;
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private personneService: PersonneService
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
  ngOnInit(): void {}
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
