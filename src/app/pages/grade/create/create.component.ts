import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GradeService } from 'src/app/services/grade/grade.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  gradeForm: FormGroup;
primary: any;
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private gradeService: GradeService
  ) {
    this.gradeForm = this.formBiulder.group({
      libelle: [''],
      salaire: [''],
    });
  }
  ngOnInit(): void {}
  onSubmit(): any {
    this.gradeService.AddGrade(this.gradeForm.value).subscribe(
      () => {
        console.log('Data added successfully');
        this.ngZone.run(() => {
          this.router.navigate(['/grade']);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
