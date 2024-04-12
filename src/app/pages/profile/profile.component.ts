import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private profileService: ProfileService
  ) {}
  public profile = {
    nom: '',
    prenom: '',
    CIN: '',
    adresse: '',
    telephone: '',
    date_naissance: '',
    role: '',
    fonction: '',
    grade: '',
    echelle: '',
    chef: '',
    service: '',
    etablissement: '',
    email: '',
  };
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (response) => {
        console.log(response);
        this.profile = response.user.personne;
        this.profile.email = response.user.email;
        this.profile.grade = response.user.personne.grade.libelle;
        this.profile.fonction = response.user.personne.fonction.libelle;
        this.profile.echelle = response.user.personne.echelle.libelle;
        this.profile.service = response.user.personne.service?.nom;
        this.profile.chef =
          response.user.personne.chef?.nom +
          ' ' +
          response.user.personne.chef?.prenom;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
