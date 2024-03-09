export class Personne {
  id: number;
  CIN: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  telephone: string;
  role: string;
  chef_id?: number;
  grade_id: number;
  fonction_id: number;
  echelle_id: number;
  service_id: number;
  constructor(
    id: number,
    CIN: string,
    nom: string,
    prenom: string,
    dateNaissance: string,
    adresse: string,
    telephone: string,
    role: string,
    grade_id: number,
    fonction_id: number,
    echelle_id: number,
    service_id: number,
    chef_id?: number
  ) {
    this.id = id;
    this.CIN = CIN;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.adresse = adresse;
    this.telephone = telephone;
    this.role = role;
    this.chef_id = chef_id;
    this.grade_id = grade_id;
    this.fonction_id = fonction_id;
    this.echelle_id = echelle_id;
    this.service_id = service_id;
  }
}
