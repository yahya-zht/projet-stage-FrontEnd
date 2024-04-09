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
import { AfterLoginService } from '../services/auth/after-login.service';
import { ProfileComponent } from '../pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'pdf',
    component: PdfComponent,
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
  },
  {
    path: 'fonction',
    children: [
      { path: '', component: FonctionComponent },
      { path: 'create', component: CreateFonction },
    ],
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
  },
  {
    path: 'conge',
    children: [
      {
        path: '',
        component: CongeComponent,
      },
    ],
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
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
    canActivate: [AfterLoginService],
  },
  {
    path: 'admin/demande/absence',
    children: [
      {
        path: '',
        component: DemandeabsenceAdminComponent,
      },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'absence',
    children: [
      {
        path: '',
        component: AbsenceComponent,
      },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
