import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/app/Models/Grade';
import { GradeService } from 'src/app/services/grade/grade.service';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  rade: Grade[] = [];
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private gradService: GradeService,
  ) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.gradService
      .getGradeById(this.getId)
      .subscribe((grade: Grade) => {
        this.updateForm.patchValue({
          libelle: grade.Grade.libelle,
          salaire: grade.Grade.salaire,
        });
      });
    this.updateForm = this.formBuilder.group({
      libelle: [''],
      salaire: ['']
    });
   }
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      salaire: ['', Validators.required],
    });
  }

  onUpdate(): any {
    this.gradService
      .updateGrade(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => {
            this.router.navigate(['/grade']);
          });
        },
        (error) => {
          this.error = error.errors;
        }
      );
  }
}
