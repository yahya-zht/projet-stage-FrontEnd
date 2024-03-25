export class Etablissement {
  id: number;
  nom: string;
  adresse: string;
  directeur: number;
  personne!: {
    nom: string;
    pernom: string;
  };
  Etablissement: any;
  Services: any;
  service!: {
    id: number;
    responsable_id: number;
    nom: string;
    nombre_employes: number;
  };
  constructor(id: number, nom: string, adresse: string, directeur: number) {
    this.id = id;
    this.nom = nom;
    this.adresse = adresse;
    this.directeur = directeur;
  }
}
