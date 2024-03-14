import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from '../pdf/pdf.component';
import { PersonneComponent } from '../pages/personne/personne.component';
import { CreateComponent as CreatePersonne } from '../pages/personne/create/create.component';
import { CreateComponent as CreateGrade } from '../pages/grade/create/create.component';
import { CreateComponent as CreateFonction } from '../pages/fonction/create/create.component';
import { CreateComponent as CreateEchelle } from '../pages/echelle/create/create.component';
import { EditComponent } from '../pages/personne/edit/edit.component';
import { GradeComponent } from '../pages/grade/grade.component';
import { FonctionComponent } from '../pages/fonction/fonction.component';
import { EchelleComponent } from '../pages/echelle/echelle.component';

const routes: Routes = [
  {
    path: 'pdf',
    component: PdfComponent,
  },
  {
    path: 'personne',
    children: [
      {
        path: '',
        component: PersonneComponent,
      },
      {
        path: 'create',
        component: CreatePersonne,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      {
        path: 'pdf/:id',
        component: PdfComponent,
      },
    ],
  },
  {
    path: 'grade',
    children: [
      {
        path: '',
        component: GradeComponent,
      },
      { path: 'create', component: CreateGrade },
    ],
  },
  {
    path: 'fonction',
    children: [
      { path: '', component: FonctionComponent },
      { path: 'create', component: CreateFonction },
    ],
  },
  {
    path: 'echelle',
    children: [
      {
        path: '',
        component: EchelleComponent,
      },
      {
        path: 'create',
        component: CreateEchelle,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
