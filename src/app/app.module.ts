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
import { EditComponent } from './pages/personne/edit/edit.component';
import { ShowComponent } from './pages/personne/show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TablePersonnesComponent } from './components/table-personnes/table-personnes.component';
import { EchelleComponent } from './pages/echelle/echelle.component';
import { FonctionComponent } from './pages/fonction/fonction.component';
import { GradeComponent } from './pages/grade/grade.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TableEchelleComponent } from './components/table-echelle/table-echelle.component';
import { TableFonctionComponent } from './components/table-fonction/table-fonction.component';
import { TableGradeComponent } from './components/table-grade/table-grade.component';
import { ServiceComponent } from './pages/service/service.component';
import { EtablissementComponent } from './pages/etablissement/etablissement.component';
import { CreateComponent } from './pages/etablissement/create/create.component';
import { TableEtablissementComponent } from './components/table-etablissement/table-etablissement.component';
import { TableServiceComponent } from './components/table-service/table-service.component';
import { TableDemandeAbsenceComponent } from './components/table-demande-absence/table-demande-absence.component';
import { TableDemandeCongeComponent } from './components/table-demande-conge/table-demande-conge.component';
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
    CreateService,
    EditComponent,
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
