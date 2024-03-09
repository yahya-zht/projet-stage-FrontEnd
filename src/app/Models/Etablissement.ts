export class Etablissement {
  id: number;
  nom: string;
  adresse: string;
  directeur: number;
  constructor(id: number, nom: string, adresse: string, directeur: number) {
    this.id = id;
    this.nom = nom;
    this.adresse = adresse;
    this.directeur = directeur;
  }
}
