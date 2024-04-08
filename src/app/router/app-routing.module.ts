import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from '../pdf/pdf.component';
import { PersonneComponent } from '../pages/personne/personne.component';
import { CreateComponent as CreatePersonne } from '../pages/personne/create/create.component';
import { CreateComponent as CreateGrade } from '../pages/grade/create/create.component';
import { CreateComponent as CreateFonction } from '../pages/fonction/create/create.component';
import { CreateComponent as CreateEchelle } from '../pages/echelle/create/create.component';
import { CreateComponent as CreateService } from '../pages/service/create/create.component';
import { CreateComponent as CreateEtablissement } from '../pages/etablissement/create/create.component';
import { CreateComponent as CreateDemandeConge } from '../pages/demandeconge/create/create.component';
import { CreateComponent as CreateDemandeAbsence } from '../pages/demandeabsence/create/create.component';
import { EditComponent as EditPersonne } from '../pages/personne/edit/edit.component';
import { EditComponent as EditEtablissement } from '../pages/etablissement/edit/edit.component';
import { EditComponent as EditService } from '../pages/service/edit/edit.component';
import { GradeComponent } from '../pages/grade/grade.component';
import { FonctionComponent } from '../pages/fonction/fonction.component';
import { EchelleComponent } from '../pages/echelle/echelle.component';
import { ServiceComponent } from '../pages/service/service.component';
import { EtablissementComponent } from '../pages/etablissement/etablissement.component';
import { DemandecongeComponent } from '../pages/demandeconge/demandeconge.component';
import { DemandecongeDirecteurComponent } from '../pages/demandeconge-directeur/demandeconge-directeur.component';
import { CongeComponent } from '../pages/conge/conge.component';
import { DemandeabsenceComponent } from '../pages/demandeabsence/demandeabsence.component';
import { DemandeabsenceAdminComponent } from '../pages/demandeabsence-admin/demandeabsence-admin.component';
import { AbsenceComponent } from '../pages/absence/absence.component';
import { ShowComponent as ShowEtablissement } from '../pages/etablissement/show/show.component';
import { ShowComponent as ShowService } from '../pages/service/show/show.component';
import { ShowComponent as ShowEmployee } from '../pages/personne/show/show.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { LoginComponent } from '../pages/login/login.component';
import { BeforeLoginService } from '../services/auth/before-login.service';

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
        component: EditPersonne,
      },
      { path: 'show/:id', component: ShowEmployee },
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
      // { path: '**', component: PageNotFoundComponent },
    ],
  },
  {
    path: 'service',
    children: [
      {
        path: '',
        component: ServiceComponent,
      },
      { path: 'create', component: CreateService },
      { path: 'edit/:id', component: EditService },
      { path: 'show/:id', component: ShowService },
    ],
  },
  {
    path: 'etablissement',
    children: [
      {
        path: '',
        component: EtablissementComponent,
      },
      { path: 'create', component: CreateEtablissement },
      { path: 'edit/:id', component: EditEtablissement },
      { path: 'show/:id', component: ShowEtablissement },
    ],
  },
  {
    path: 'conge',
    children: [
      {
        path: '',
        component: CongeComponent,
      },
    ],
  },
  {
    path: 'demande/conge',
    children: [
      {
        path: '',
        component: DemandecongeComponent,
      },
      { path: 'create', component: CreateDemandeConge },
      {
        path: 'pdf/:id',
        component: PdfComponent,
      },
    ],
  },
  {
    path: 'admin/demande/conge',
    children: [
      {
        path: '',
        component: DemandecongeDirecteurComponent,
      },
      {
        path: 'pdf/:id',
        component: PdfComponent,
      },
    ],
  },

  {
    path: 'demande/absence',
    children: [
      {
        path: '',
        component: DemandeabsenceComponent,
      },
      { path: 'create', component: CreateDemandeAbsence },
    ],
  },
  {
    path: 'admin/demande/absence',
    children: [
      {
        path: '',
        component: DemandeabsenceAdminComponent,
      },
    ],
  },
  {
    path: 'absence',
    children: [
      {
        path: '',
        component: AbsenceComponent,
      },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [BeforeLoginService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
