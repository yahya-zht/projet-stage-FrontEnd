export class Service {
  id: number;
  nom: string;
  responsable_id: number;
  nomberemployes: number;
  responsable!: {
    nom: string;
    pernom: string;
  };
  etablissement!: {
    id: number;
    nom: string;
    adresse: string;
    directeur: number;
  };
  Service: any;
  constructor(
    id: number,
    nom: string,
    responsable_id: number,
    nomberemployes: number
  ) {
    this.id = id;
    this.nom = nom;
    this.responsable_id = responsable_id;
    this.nomberemployes = nomberemployes;
  }
}
