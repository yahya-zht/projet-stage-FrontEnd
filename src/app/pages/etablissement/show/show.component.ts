import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etablissement } from 'src/app/Models/Etablissement';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  getId: any;
  etablissement: Etablissement | any;
  NomEtablissement: string = '';
  NomDirecteur: string = '';
  PrenomDirecteur: string = '';
  AdresseEtablissement: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private etablissementService: EtablissementService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.etablissementService
      .getEtablissementById(this.getId)
      .subscribe((etablissement: Etablissement) => {
        console.log(
          'Etablissement ====>>>> ' + etablissement.Etablissement.directeur.nom
        );
        this.NomEtablissement = etablissement.Etablissement['nom'];
        this.AdresseEtablissement = etablissement.Etablissement['adresse'];
        this.NomDirecteur = etablissement.Etablissement.directeur.nom;
        this.PrenomDirecteur = etablissement.Etablissement.directeur.pernom;
      });
  }
  ngOnInit(): void {}
}
