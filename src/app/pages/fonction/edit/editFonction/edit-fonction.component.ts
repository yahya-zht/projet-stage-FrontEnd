import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fonction } from 'src/app/Models/Fonction';
import { FonctionService } from 'src/app/services/fonction/fonction.service';

@Component({
  selector: 'app-edit-fonction',
  templateUrl: './edit-fonction.component.html',
  styleUrls: ['./edit-fonction.component.css']
})
export class EditFonctionComponent implements OnInit {
  
  getId: any;
  updateForm: FormGroup;
  Fonction: Fonction[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private fonctionService: FonctionService,
  ) { 
    
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fonctionService
      .getFonctionById(this.getId)
      .subscribe((fonction: Fonction) => {
        this.updateForm.patchValue({
          libelle: fonction.Fonction.libelle,
        });
      });
    this.updateForm = this.formBuilder.group({
      libelle: [''],
    });
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      libelle: ['', Validators.required]
    });
  }

  onUpdate(): any {
    this.fonctionService
      .updateFonction(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/fonction']);
          });
        },
        (error) => {
          this.error = error.errors;
        }
      );
  }
}
