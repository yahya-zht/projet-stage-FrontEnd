export class Etablissement {
  id: number;
  nom: string;
  adresse: string;
  directeur_id: number;
  directeur!: {
    nom: string;
    prenom: string;
  };
  Etablissement: any;
  Services: any;
  service!: {
    id: number;
    responsable_id: number;
    nom: string;
    nombre_employes: number;
  };
  responsable!: {
    nom: string;
    prenom: string;
  };
  constructor(id: number, nom: string, adresse: string, directeur_id: number) {
    this.id = id;
    this.nom = nom;
    this.adresse = adresse;
    this.directeur_id = directeur_id;
  }
}
