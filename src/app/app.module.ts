import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { PdfComponent } from './pdf/pdf.component';
import { PersonneComponent } from './pages/personne/personne.component';
import { CreateComponent } from './pages/personne/create/create.component';
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
@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    PersonneComponent,
    CreateComponent,
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
