import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EchelleService } from 'src/app/services/echelle/echelle.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  echelleForm: FormGroup;
  error: any;
  constructor(
    public formBiulder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private echelleService: EchelleService
  ) {
    this.echelleForm = this.formBiulder.group({
      libelle: [''],
      niveau: [''],
    });
  }
  ngOnInit(): void {}
  onSubmit(): any {
    this.echelleService.AddEchelle(this.echelleForm.value).subscribe(
      () => {
        console.log('Data added successfully');
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
