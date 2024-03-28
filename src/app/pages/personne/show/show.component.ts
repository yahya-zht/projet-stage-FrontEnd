import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personne } from 'src/app/Models/Personne';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  getId: any;
  CIN: string = '';
  Nom: string = '';
  Prenom: string = '';
  Telephon: string = '';
  Adresse: string = '';
  Date_Naissance: string = '';
  Role: string = '';
  Fonction: string = '';
  Grade: string = '';
  Echelle: string = '';
  Chef: string = '';
  Service: string = '';
  Etablissement: string = '';
  Email: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private personneService: PersonneService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.personneService
      .getPersonneById(this.getId)
      .subscribe((personne: Personne) => {
        this.CIN = personne.Personne.CIN;
        this.Nom = personne.Personne.nom;
        this.Prenom = personne.Personne.prenom;
        this.Telephon = personne.Personne.telephone;
        this.Adresse = personne.Personne.adresse;
        this.Date_Naissance = personne.Personne.date_naissance;
        this.Role = personne.Personne.role;
        this.Role = personne.Personne.role;
        this.Fonction = personne.Personne.fonction.libelle;
        this.Grade = personne.Personne.grade.libelle;
        this.Echelle = personne.Personne.echelle.libelle;
        this.Service = personne.Personne.service.nom;
        this.Etablissement = '---';
        this.Chef =
          personne.Personne.chef?.nom + ' ' + personne.Personne.chef?.prenom;
      });
  }

  ngOnInit(): void {}
}
