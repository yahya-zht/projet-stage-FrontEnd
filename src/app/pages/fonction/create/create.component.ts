import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FonctionService } from 'src/app/services/fonction/fonction.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  fonctionForm: FormGroup;
  error: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private fonctionService: FonctionService
  ) {
    this.fonctionForm = this.formBuilder.group({
      libelle: [''],
    });
  }
  ngOnInit(): void {}
  onSubmit(): any {
    this.fonctionService.AddFonction(this.fonctionForm.value).subscribe(
      () => {
        console.log('Data added successfully');
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
