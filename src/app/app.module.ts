import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { PdfComponent } from './pdf/pdf.component';
import { PersonneComponent } from './pages/personne/personne.component';
import { CreateComponent as CreatePersonne } from './pages/personne/create/create.component';
import { CreateComponent as CreateEchelle } from './pages/echelle/create/create.component';
import { CreateComponent as CreateFonction } from './pages/fonction/create/create.component';
import { CreateComponent as CreateGrade } from './pages/grade/create/create.component';
import { CreateComponent as CreateService } from './pages/service/create/create.component';
import { CreateComponent as CreateEtablissement } from './pages/etablissement/create/create.component';
import { CreateComponent as CreateDemandeConge } from './pages/demandeconge/create/create.component';
import { CreateComponent as CreateDemandeAbsence } from './pages/demandeabsence/create/create.component';
import { EditComponent as EditPersonne } from './pages/personne/edit/edit.component';
import { EditComponent as EditEtablissement } from './pages/etablissement/edit/edit.component';
import { EditComponent as EditService } from './pages/service/edit/edit.component';
import { ShowComponent } from './pages/personne/show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TablePersonnesComponent } from './components/tables/table-personnes/table-personnes.component';
import { EchelleComponent } from './pages/echelle/echelle.component';
import { FonctionComponent } from './pages/fonction/fonction.component';
import { GradeComponent } from './pages/grade/grade.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TableEchelleComponent } from './components/tables/table-echelle/table-echelle.component';
import { TableFonctionComponent } from './components/tables/table-fonction/table-fonction.component';
import { TableGradeComponent } from './components/tables/table-grade/table-grade.component';
import { ServiceComponent } from './pages/service/service.component';
import { EtablissementComponent } from './pages/etablissement/etablissement.component';
import { CreateComponent } from './pages/etablissement/create/create.component';
import { TableEtablissementComponent } from './components/tables/table-etablissement/table-etablissement.component';
import { TableServiceComponent } from './components/tables/table-service/table-service.component';
import { TableDemandeAbsenceComponent } from './components/tables/table-demande-absence/table-demande-absence.component';
import { TableDemandeCongeComponent } from './components/tables/table-demande-conge/table-demande-conge.component';
import { EditComponent } from './pages/service/edit/edit.component';
import { DemandecongeComponent } from './pages/demandeconge/demandeconge.component';
import { DemandecongeDirecteurComponent } from './pages/demandeconge-directeur/demandeconge-directeur.component';
import { TableDemandeCongeDirecteurComponent } from './components/tables/table-demande-conge-directeur/table-demande-conge-directeur.component';
import { CongeComponent } from './pages/conge/conge.component';
import { TableCongeComponent } from './components/tables/table-conge/table-conge.component';
import { DemandeabsenceComponent } from './pages/demandeabsence/demandeabsence.component';
import { DemandeabsenceAdminComponent } from './pages/demandeabsence-admin/demandeabsence-admin.component';
import { TableDemandeAbsenceAdminComponent } from './components/tables/table-demande-absence-admin/table-demande-absence-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    PersonneComponent,
    CreatePersonne,
    CreateEchelle,
    CreateFonction,
    CreateGrade,
    CreateEtablissement,
    CreateDemandeConge,
    CreateDemandeAbsence,
    CreateService,
    EditPersonne,
    EditEtablissement,
    EditService,
    ShowComponent,
    TablePersonnesComponent,
    EchelleComponent,
    FonctionComponent,
    GradeComponent,
    NavBarComponent,
    TableEchelleComponent,
    TableFonctionComponent,
    TableGradeComponent,
    ServiceComponent,
    EtablissementComponent,
    CreateComponent,
    TableEtablissementComponent,
    TableServiceComponent,
    TableDemandeAbsenceComponent,
    TableDemandeCongeComponent,
    EditComponent,
    DemandecongeComponent,
    DemandecongeDirecteurComponent,
    TableDemandeCongeDirecteurComponent,
    CongeComponent,
    TableCongeComponent,
    DemandeabsenceComponent,
    DemandeabsenceAdminComponent,
    TableDemandeAbsenceAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
