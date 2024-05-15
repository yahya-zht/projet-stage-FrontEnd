import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Echelle } from '../../../../Models/Echelle';
import { EchelleService } from 'src/app/services/echelle/echelle.service';


@Component({
  selector: 'app-edit-echelle',
  templateUrl: './edit-echelle.component.html',
  styleUrls: ['./edit-echelle.component.css']
})
export class EditEchelleComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  Echelle: Echelle[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private echelleService: EchelleService,
  ) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.echelleService
      .getEchelleById(this.getId)
      .subscribe((echelle: Echelle) => {
        this.updateForm.patchValue({
          libelle: echelle.Echelle.libelle,
          niveau: echelle.Echelle.niveau,
        });
      });
    this.updateForm = this.formBuilder.group({
      libelle: [''],
      niveau: [''],
    });
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }

  onUpdate(): any {
    this.echelleService
      .updateEchelle(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/echelle']);
          });
        },
        (error) => {
          this.error = error.errors;
        }
      );
  }

}
