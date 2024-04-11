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
import { AccueilComponent } from '../pages/accueil/accueil.component';
import { RoleGuard } from './role.guard';
import { TablePersonnesComponent } from '../components/tables/table-personnes/table-personnes.component';
import { TableGradeComponent } from '../components/tables/table-grade/table-grade.component';
import { TableFonctionComponent } from '../components/tables/table-fonction/table-fonction.component';
import { TableEchelleComponent } from '../components/tables/table-echelle/table-echelle.component';
import { TableServiceComponent } from '../components/tables/table-service/table-service.component';
import { TableEtablissementComponent } from '../components/tables/table-etablissement/table-etablissement.component';
import { TableCongeComponent } from '../components/tables/table-conge/table-conge.component';
import { TableDemandeCongeComponent } from '../components/tables/table-demande-conge/table-demande-conge.component';
import { TableDemandeCongeDirecteurComponent } from '../components/tables/table-demande-conge-directeur/table-demande-conge-directeur.component';
import { TableDemandeAbsenceComponent } from '../components/tables/table-demande-absence/table-demande-absence.component';
import { TableDemandeAbsenceAdminComponent } from '../components/tables/table-demande-absence-admin/table-demande-absence-admin.component';
import { TableAbsenceComponent } from '../components/tables/table-absence/table-absence.component';

const routes: Routes = [
  {
    path: '',
    component: AccueilComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'pdf',
    component: PdfComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'personne',
    component: PersonneComponent,
    children: [
      {
        path: '',
        component: TablePersonnesComponent,
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
    component: GradeComponent,
    children: [
      {
        path: '',
        component: TableGradeComponent,
      },
      { path: 'create', component: CreateGrade },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'fonction',
    component: FonctionComponent,
    children: [
      { path: '', component: TableFonctionComponent },
      { path: 'create', component: CreateFonction },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'echelle',
    component: EchelleComponent,
    children: [
      {
        path: '',
        component: TableEchelleComponent,
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
    component: ServiceComponent,
    children: [
      {
        path: '',
        component: TableServiceComponent,
      },
      { path: 'create', component: CreateService },
      { path: 'edit/:id', component: EditService },
      { path: 'show/:id', component: ShowService },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'etablissement',
    component: EtablissementComponent,
    children: [
      {
        path: '',
        component: TableEtablissementComponent,
      },
      { path: 'create', component: CreateEtablissement },
      { path: 'edit/:id', component: EditEtablissement },
      { path: 'show/:id', component: ShowEtablissement },
    ],
    canActivate: [AfterLoginService, RoleGuard],
  },
  {
    path: 'conge',
    component: CongeComponent,
    children: [
      {
        path: '',
        component: TableCongeComponent,
      },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'demande/conge',
    component: DemandecongeComponent,
    children: [
      {
        path: '',
        component: TableDemandeCongeComponent,
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
    component: DemandecongeDirecteurComponent,
    children: [
      {
        path: '',
        component: TableDemandeCongeDirecteurComponent,
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
    component: DemandeabsenceComponent,
    children: [
      {
        path: '',
        component: TableDemandeAbsenceComponent,
      },
      { path: 'create', component: CreateDemandeAbsence },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'admin/demande/absence',
    component: DemandeabsenceAdminComponent,
    children: [
      {
        path: '',
        component: TableDemandeAbsenceAdminComponent,
      },
    ],
    canActivate: [AfterLoginService],
  },
  {
    path: 'absence',
    component: AbsenceComponent,
    children: [
      {
        path: '',
        component: TableAbsenceComponent,
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
  { path: '**', component: AccueilComponent, canActivate: [AfterLoginService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
