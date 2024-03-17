import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from 'src/app/Models/Etablissement';
import { Personne } from 'src/app/Models/Personne';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  Personnes: Personne[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private etablissementService: EtablissementService,
    private personneService: PersonneService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.etablissementService
      .getEtablissementById(this.getId)
      .subscribe((etablissement: Etablissement) => {
        this.updateForm.patchValue({
          nom: etablissement.Etablissement['nom'],
          adresse: etablissement.Etablissement.adresse,
          directeur_id: etablissement.Etablissement.directeur_id,
        });
      });
    this.updateForm = this.formBuilder.group({
      nom: [''],
      adresse: [''],
      directeur_id: [''],
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
          console.log(error);
        }
      );
  }
}
